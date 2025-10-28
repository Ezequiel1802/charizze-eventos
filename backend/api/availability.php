<?php
// Incluir archivos de configuración
require_once '../config/database.php';
require_once '../config/config.php';

// Crear instancia de la base de datos
$database = new Database();
$db = $database->getConnection();

// Determinar el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Verificar qué tipo de información se solicita
        if (isset($_GET['mes']) && isset($_GET['anio'])) {
            getCalendarioMensual($db, $_GET['mes'], $_GET['anio']);
        } else {
            getFechasDisponibles($db);
        }
        break;
        
    case 'POST':
        // Bloquear fecha (solo admin)
        bloquearFecha($db);
        break;
        
    default:
        jsonResponse(false, 'Método no permitido', [], 405);
        break;
}

// Función para obtener fechas disponibles
function getFechasDisponibles($db) {
    try {
        // Obtener fechas bloqueadas
        $stmt = $db->prepare("SELECT fecha FROM disponibilidad WHERE bloqueado = 1");
        $stmt->execute();
        $fechas_bloqueadas = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Obtener fechas con reservas
        $stmt = $db->prepare("SELECT fecha_evento FROM reservas WHERE estado != 'cancelado'");
        $stmt->execute();
        $fechas_reservadas = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Combinar fechas no disponibles
        $fechas_no_disponibles = array_merge($fechas_bloqueadas, $fechas_reservadas);
        
        // Generar fechas para los próximos 6 meses
        $fechas_disponibles = [];
        $fecha_actual = new DateTime();
        $fecha_limite = clone $fecha_actual;
        $fecha_limite->modify('+6 months');
        
        while ($fecha_actual <= $fecha_limite) {
            $fecha_str = $fecha_actual->format('Y-m-d');
            
            // Si la fecha no está en las no disponibles, está disponible
            if (!in_array($fecha_str, $fechas_no_disponibles)) {
                $fechas_disponibles[] = $fecha_str;
            }
            
            $fecha_actual->modify('+1 day');
        }
        
        jsonResponse(true, 'Fechas disponibles obtenidas con éxito', $fechas_disponibles, 200);
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener fechas disponibles: ' . $e->getMessage(), [], 500);
    }
}

// Función para obtener calendario mensual
function getCalendarioMensual($db, $mes, $anio) {
    try {
        // Validar mes y año
        $mes = intval($mes);
        $anio = intval($anio);
        
        if ($mes < 1 || $mes > 12 || $anio < 2000 || $anio > 2100) {
            jsonResponse(false, 'Mes o año inválido', [], 400);
            return;
        }
        
        // Primer día del mes
        $primer_dia = new DateTime("$anio-$mes-01");
        
        // Último día del mes
        $ultimo_dia = clone $primer_dia;
        $ultimo_dia->modify('last day of this month');
        
        // Obtener fechas bloqueadas del mes
        $inicio = $primer_dia->format('Y-m-d');
        $fin = $ultimo_dia->format('Y-m-d');
        
        $stmt = $db->prepare("SELECT fecha, motivo FROM disponibilidad 
                             WHERE bloqueado = 1 AND fecha BETWEEN :inicio AND :fin");
        $stmt->bindParam(':inicio', $inicio);
        $stmt->bindParam(':fin', $fin);
        $stmt->execute();
        
        $fechas_bloqueadas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $fechas_bloqueadas[$row['fecha']] = $row['motivo'];
        }
        
        // Obtener reservas del mes
        $stmt = $db->prepare("SELECT fecha_evento, tipo_evento, estado FROM reservas 
                             WHERE fecha_evento BETWEEN :inicio AND :fin");
        $stmt->bindParam(':inicio', $inicio);
        $stmt->bindParam(':fin', $fin);
        $stmt->execute();
        
        $reservas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $reservas[$row['fecha_evento']] = [
                'tipo' => $row['tipo_evento'],
                'estado' => $row['estado']
            ];
        }
        
        // Generar calendario
        $calendario = [];
        $fecha_actual = clone $primer_dia;
        
        while ($fecha_actual <= $ultimo_dia) {
            $fecha_str = $fecha_actual->format('Y-m-d');
            $dia = $fecha_actual->format('j');
            
            $estado = 'disponible';
            $info = null;
            
            if (isset($fechas_bloqueadas[$fecha_str])) {
                $estado = 'bloqueado';
                $info = $fechas_bloqueadas[$fecha_str];
            } elseif (isset($reservas[$fecha_str])) {
                $estado = 'reservado';
                $info = $reservas[$fecha_str];
            }
            
            $calendario[] = [
                'fecha' => $fecha_str,
                'dia' => $dia,
                'estado' => $estado,
                'info' => $info
            ];
            
            $fecha_actual->modify('+1 day');
        }
        
        jsonResponse(true, 'Calendario mensual obtenido con éxito', [
            'mes' => $mes,
            'anio' => $anio,
            'dias' => $calendario
        ], 200);
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener calendario: ' . $e->getMessage(), [], 500);
    }
}

// Función para bloquear fecha (solo admin)
function bloquearFecha($db) {
    try {
        // Verificar si es admin (en producción usaríamos autenticación)
        // if (!esAdmin()) {
        //     jsonResponse(false, 'No autorizado', [], 403);
        //     return;
        // }
        
        // Obtener datos del POST
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['fecha']) || !isset($data['bloqueado'])) {
            jsonResponse(false, 'Parámetros insuficientes', [], 400);
            return;
        }
        
        // Validar formato de fecha
        if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $data['fecha'])) {
            jsonResponse(false, 'Formato de fecha inválido. Use YYYY-MM-DD', [], 400);
            return;
        }
        
        // Verificar si ya existe un registro para esta fecha
        $stmt = $db->prepare("SELECT id FROM disponibilidad WHERE fecha = :fecha");
        $stmt->bindParam(':fecha', $data['fecha']);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            // Actualizar registro existente
            $stmt = $db->prepare("UPDATE disponibilidad SET bloqueado = :bloqueado, motivo = :motivo WHERE fecha = :fecha");
        } else {
            // Crear nuevo registro
            $stmt = $db->prepare("INSERT INTO disponibilidad (fecha, bloqueado, motivo) VALUES (:fecha, :bloqueado, :motivo)");
        }
        
        $bloqueado = $data['bloqueado'] ? 1 : 0;
        $motivo = $data['motivo'] ?? null;
        
        $stmt->bindParam(':fecha', $data['fecha']);
        $stmt->bindParam(':bloqueado', $bloqueado);
        $stmt->bindParam(':motivo', $motivo);
        
        if ($stmt->execute()) {
            jsonResponse(true, 'Disponibilidad actualizada con éxito', [], 200);
        } else {
            jsonResponse(false, 'Error al actualizar disponibilidad', [], 500);
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al actualizar disponibilidad: ' . $e->getMessage(), [], 500);
    }
}
?>