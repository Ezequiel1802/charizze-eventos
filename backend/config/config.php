<?php
// Configuración general
define('BASE_URL', 'http://localhost/Charlizze%20Eventos');
define('SITE_NAME', 'Charlizze Eventos');
define('EMAIL_ADMIN', 'admin@charlizze-eventos.com');

// Configuración de seguridad
define('SECURE_TOKEN', bin2hex(random_bytes(32)));
define('SESSION_LIFETIME', 3600); // 1 hora

// Funciones de utilidad
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para generar códigos de reserva
function generateBookingCode() {
    $prefix = "CHZ-" . date('Y') . "-";
    $randomPart = mt_rand(1000, 9999);
    return $prefix . $randomPart;
}

// Función para respuesta JSON estándar
function jsonResponse($success = true, $message = '', $data = [], $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    
    $response = [
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode($response);
    exit;
}

// Configuración CORS para permitir peticiones del frontend
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Si es una solicitud OPTIONS, terminar aquí (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
?>