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
        // Verificar si se solicita disponibilidad o detalles de reserva
        if (isset($_GET['check_date'])) {
            checkAvailability($db, $_GET['check_date']);
        } elseif (isset($_GET['codigo'])) {
            getBookingDetails($db, $_GET['codigo']);
        } else {
            jsonResponse(false, 'Parámetros insuficientes', [], 400);
        }
        break;
        
    case 'POST':
        // Crear nueva reserva
        createBooking($db);
        break;
        
    case 'PUT':
        // Actualizar estado de reserva
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['codigo']) && isset($data['estado'])) {
            updateBookingStatus($db, $data['codigo'], $data['estado']);
        } else {
            jsonResponse(false, 'Parámetros insuficientes', [], 400);
        }
        break;
        
    default:
        jsonResponse(false, 'Método no permitido', [], 405);
        break;
}

// Función para verificar disponibilidad
function checkAvailability($db, $date) {
    try {
        // Validar formato de fecha
        if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $date)) {
            jsonResponse(false, 'Formato de fecha inválido. Use YYYY-MM-DD', [], 400);
            return;
        }
        
        // Verificar si la fecha está bloqueada
        $stmt = $db->prepare("SELECT bloqueado, motivo FROM disponibilidad WHERE fecha = :fecha");
        $stmt->bindParam(':fecha', $date);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row['bloqueado']) {
                jsonResponse(false, 'Fecha no disponible: ' . $row['motivo'], ['disponible' => false], 200);
                return;
            }
        }
        
        // Verificar si ya hay reservas para esa fecha
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM reservas WHERE fecha_evento = :fecha AND estado != 'cancelado'");
        $stmt->bindParam(':fecha', $date);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row['total'] > 0) {
            jsonResponse(false, 'Fecha no disponible: Ya existe una reserva', ['disponible' => false], 200);
        } else {
            jsonResponse(true, 'Fecha disponible', ['disponible' => true], 200);
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al verificar disponibilidad: ' . $e->getMessage(), [], 500);
    }
}

// Función para obtener detalles de reserva
function getBookingDetails($db, $codigo) {
    try {
        $stmt = $db->prepare("SELECT * FROM reservas WHERE codigo_reserva = :codigo");
        $stmt->bindParam(':codigo', $codigo);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $reserva = $stmt->fetch(PDO::FETCH_ASSOC);
            jsonResponse(true, 'Detalles de reserva obtenidos con éxito', $reserva, 200);
        } else {
            jsonResponse(false, 'Reserva no encontrada', [], 404);
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener detalles de reserva: ' . $e->getMessage(), [], 500);
    }
}

// Función para crear nueva reserva
function createBooking($db) {
    try {
        // Obtener datos del POST
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validar datos requeridos
        $requiredFields = ['nombre_cliente', 'email_cliente', 'telefono_cliente', 'fecha_evento', 
                          'hora_inicio', 'hora_fin', 'tipo_evento', 'num_invitados', 'paquete'];
        
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                jsonResponse(false, 'Campo requerido faltante: ' . $field, [], 400);
                return;
            }
        }
        
        // Verificar disponibilidad de la fecha
        $stmt = $db->prepare("SELECT COUNT(*) as total FROM reservas WHERE fecha_evento = :fecha AND estado != 'cancelado'");
        $stmt->bindParam(':fecha', $data['fecha_evento']);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row['total'] > 0) {
            jsonResponse(false, 'Fecha no disponible: Ya existe una reserva', [], 409);
            return;
        }
        
        // Generar código de reserva único
        $codigo_reserva = generateBookingCode();
        
        // Calcular monto total (simplificado - en producción sería más complejo)
        $monto_total = calcularMontoTotal($data['paquete'], $data['num_invitados'], $data['servicios_extra'] ?? []);
        
        // Preparar servicios extra como JSON
        $servicios_extra = isset($data['servicios_extra']) ? json_encode($data['servicios_extra']) : null;
        
        // Insertar reserva
        $stmt = $db->prepare("INSERT INTO reservas (codigo_reserva, nombre_cliente, email_cliente, telefono_cliente, 
                            fecha_evento, hora_inicio, hora_fin, tipo_evento, num_invitados, paquete, 
                            servicios_extra, monto_total, solicitudes_especiales) 
                            VALUES (:codigo, :nombre, :email, :telefono, :fecha, :hora_inicio, :hora_fin, 
                            :tipo, :invitados, :paquete, :servicios, :monto, :solicitudes)");
        
        $stmt->bindParam(':codigo', $codigo_reserva);
        $stmt->bindParam(':nombre', $data['nombre_cliente']);
        $stmt->bindParam(':email', $data['email_cliente']);
        $stmt->bindParam(':telefono', $data['telefono_cliente']);
        $stmt->bindParam(':fecha', $data['fecha_evento']);
        $stmt->bindParam(':hora_inicio', $data['hora_inicio']);
        $stmt->bindParam(':hora_fin', $data['hora_fin']);
        $stmt->bindParam(':tipo', $data['tipo_evento']);
        $stmt->bindParam(':invitados', $data['num_invitados']);
        $stmt->bindParam(':paquete', $data['paquete']);
        $stmt->bindParam(':servicios', $servicios_extra);
        $stmt->bindParam(':monto', $monto_total);
        $stmt->bindParam(':solicitudes', $data['solicitudes_especiales'] ?? null);
        
        if ($stmt->execute()) {
            // Enviar email de confirmación (simulado)
            // enviarEmailConfirmacion($data['email_cliente'], $codigo_reserva);
            
            jsonResponse(true, 'Reserva creada con éxito', [
                'codigo_reserva' => $codigo_reserva,
                'monto_total' => $monto_total
            ], 201);
        } else {
            jsonResponse(false, 'Error al crear la reserva', [], 500);
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al crear reserva: ' . $e->getMessage(), [], 500);
    }
}

// Función para actualizar estado de reserva
function updateBookingStatus($db, $codigo, $estado) {
    try {
        // Validar estado
        $estados_validos = ['pendiente', 'confirmado', 'pagado', 'cancelado'];
        if (!in_array($estado, $estados_validos)) {
            jsonResponse(false, 'Estado no válido', [], 400);
            return;
        }
        
        $stmt = $db->prepare("UPDATE reservas SET estado = :estado WHERE codigo_reserva = :codigo");
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':codigo', $codigo);
        
        if ($stmt->execute()) {
            jsonResponse(true, 'Estado de reserva actualizado con éxito', [], 200);
        } else {
            jsonResponse(false, 'Error al actualizar estado de reserva', [], 500);
        }
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al actualizar estado: ' . $e->getMessage(), [], 500);
    }
}

// Función para calcular monto total (simplificada)
function calcularMontoTotal($paquete, $invitados, $servicios_extra = []) {
    // Precios base por paquete (en producción estos vendrían de la base de datos)
    $precios_paquete = [
        'basico' => 5000,
        'premium' => 8000,
        'vip' => 12000
    ];
    
    // Precio base según paquete
    $total = $precios_paquete[$paquete] ?? 5000;
    
    // Ajuste por número de invitados
    $total += ($invitados * 100); // 100 por invitado
    
    // Sumar servicios extra
    if (!empty($servicios_extra)) {
        // En producción, consultaríamos los precios de la base de datos
        $total += 2000; // Valor simplificado para este ejemplo
    }
    
    return $total;
}
?>