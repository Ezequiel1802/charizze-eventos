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
        if (isset($_GET['paquetes'])) {
            getPaquetes();
        } elseif (isset($_GET['calcular_precio'])) {
            calcularPrecio();
        } else {
            getServicios($db);
        }
        break;
        
    default:
        jsonResponse(false, 'Método no permitido', [], 405);
        break;
}

// Función para obtener todos los servicios extra
function getServicios($db) {
    try {
        $stmt = $db->prepare("SELECT * FROM servicios_extra WHERE activo = 1 ORDER BY categoria, nombre");
        $stmt->execute();
        
        $servicios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        jsonResponse(true, 'Servicios obtenidos con éxito', $servicios, 200);
    } catch (PDOException $e) {
        jsonResponse(false, 'Error al obtener servicios: ' . $e->getMessage(), [], 500);
    }
}

// Función para obtener información de paquetes
function getPaquetes() {
    // En producción, esta información vendría de la base de datos
    $paquetes = [
        'basico' => [
            'nombre' => 'Paquete Básico',
            'descripcion' => 'Incluye salón por 5 horas, mobiliario básico y equipo de sonido',
            'precio_base' => 5000,
            'max_invitados' => 50,
            'incluye' => [
                'Salón por 5 horas',
                'Mesas y sillas',
                'Equipo de sonido básico',
                'Personal de limpieza'
            ]
        ],
        'premium' => [
            'nombre' => 'Paquete Premium',
            'descripcion' => 'Incluye salón por 8 horas, mobiliario premium, equipo de sonido y decoración básica',
            'precio_base' => 8000,
            'max_invitados' => 100,
            'incluye' => [
                'Salón por 8 horas',
                'Mesas y sillas premium',
                'Equipo de sonido profesional',
                'Decoración básica',
                'Personal de limpieza',
                'Coordinador de eventos'
            ]
        ],
        'vip' => [
            'nombre' => 'Paquete VIP',
            'descripcion' => 'Experiencia completa con salón por 12 horas, mobiliario de lujo, equipo audiovisual, decoración premium y más',
            'precio_base' => 12000,
            'max_invitados' => 200,
            'incluye' => [
                'Salón por 12 horas',
                'Mobiliario de lujo',
                'Sistema audiovisual completo',
                'Decoración premium',
                'Personal de limpieza y seguridad',
                'Coordinador de eventos dedicado',
                'Menú de degustación previo',
                'Estacionamiento VIP'
            ]
        ]
    ];
    
    jsonResponse(true, 'Información de paquetes obtenida con éxito', $paquetes, 200);
}

// Función para calcular precio basado en selección
function calcularPrecio() {
    // Obtener parámetros
    $paquete = $_GET['paquete'] ?? 'basico';
    $invitados = intval($_GET['invitados'] ?? 50);
    $servicios = isset($_GET['servicios']) ? explode(',', $_GET['servicios']) : [];
    
    // Precios base por paquete
    $precios_paquete = [
        'basico' => 5000,
        'premium' => 8000,
        'vip' => 12000
    ];
    
    // Precio base según paquete
    $total = $precios_paquete[$paquete] ?? 5000;
    
    // Ajuste por número de invitados
    $total += ($invitados * 100); // 100 por invitado
    
    // Precios de servicios extra (en producción vendrían de la base de datos)
    $precios_servicios = [
        'catering' => 3000,
        'decoracion' => 2000,
        'dj' => 1500,
        'fotografia' => 2500,
        'meseros' => 1000,
        'seguridad' => 1200
    ];
    
    // Sumar servicios extra
    foreach ($servicios as $servicio) {
        if (isset($precios_servicios[$servicio])) {
            $total += $precios_servicios[$servicio];
        }
    }
    
    // Desglose de precios
    $desglose = [
        'paquete_base' => $precios_paquete[$paquete] ?? 5000,
        'costo_invitados' => $invitados * 100,
        'servicios_extra' => []
    ];
    
    foreach ($servicios as $servicio) {
        if (isset($precios_servicios[$servicio])) {
            $desglose['servicios_extra'][$servicio] = $precios_servicios[$servicio];
        }
    }
    
    jsonResponse(true, 'Cálculo de precio realizado con éxito', [
        'total' => $total,
        'desglose' => $desglose
    ], 200);
}
?>