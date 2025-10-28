<?php
// Incluir archivos de configuración
require_once '../config/database.php';
require_once '../config/config.php';

// Determinar el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // Verificar tipo de solicitud
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['tipo']) && $data['tipo'] == 'informacion') {
            solicitarInformacion($data);
        } else {
            enviarMensajeContacto($data);
        }
        break;
        
    default:
        jsonResponse(false, 'Método no permitido', [], 405);
        break;
}

// Función para enviar mensaje de contacto
function enviarMensajeContacto($data) {
    // Validar datos requeridos
    if (!isset($data['nombre']) || !isset($data['email']) || !isset($data['mensaje'])) {
        jsonResponse(false, 'Faltan campos requeridos', [], 400);
        return;
    }
    
    // Sanitizar datos
    $nombre = sanitizeInput($data['nombre']);
    $email = sanitizeInput($data['email']);
    $telefono = sanitizeInput($data['telefono'] ?? '');
    $mensaje = sanitizeInput($data['mensaje']);
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(false, 'Email inválido', [], 400);
        return;
    }
    
    // En producción, aquí guardaríamos el mensaje en la base de datos
    // y enviaríamos un email real
    
    // Simulación de envío de email
    $destinatario = EMAIL_ADMIN;
    $asunto = "Nuevo mensaje de contacto - " . SITE_NAME;
    
    $cuerpo = "Nuevo mensaje de contacto:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Mensaje: $mensaje\n";
    
    // En un entorno real, usaríamos mail() o una librería como PHPMailer
    // mail($destinatario, $asunto, $cuerpo, "From: $email");
    
    // Simular éxito
    jsonResponse(true, 'Mensaje enviado con éxito. Nos pondremos en contacto pronto.', [], 200);
}

// Función para solicitar información personalizada
function solicitarInformacion($data) {
    // Validar datos requeridos
    if (!isset($data['nombre']) || !isset($data['email']) || !isset($data['fecha_evento'])) {
        jsonResponse(false, 'Faltan campos requeridos', [], 400);
        return;
    }
    
    // Sanitizar datos
    $nombre = sanitizeInput($data['nombre']);
    $email = sanitizeInput($data['email']);
    $telefono = sanitizeInput($data['telefono'] ?? '');
    $fecha_evento = sanitizeInput($data['fecha_evento']);
    $tipo_evento = sanitizeInput($data['tipo_evento'] ?? '');
    $num_invitados = intval($data['num_invitados'] ?? 0);
    $comentarios = sanitizeInput($data['comentarios'] ?? '');
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(false, 'Email inválido', [], 400);
        return;
    }
    
    // En producción, aquí guardaríamos la solicitud en la base de datos
    // y enviaríamos un email real
    
    // Simulación de envío de email
    $destinatario = EMAIL_ADMIN;
    $asunto = "Solicitud de información - " . SITE_NAME;
    
    $cuerpo = "Nueva solicitud de información personalizada:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Fecha del evento: $fecha_evento\n";
    $cuerpo .= "Tipo de evento: $tipo_evento\n";
    $cuerpo .= "Número de invitados: $num_invitados\n";
    $cuerpo .= "Comentarios adicionales: $comentarios\n";
    
    // En un entorno real, usaríamos mail() o una librería como PHPMailer
    // mail($destinatario, $asunto, $cuerpo, "From: $email");
    
    // Simular éxito
    jsonResponse(true, 'Solicitud recibida con éxito. Te enviaremos información personalizada pronto.', [], 200);
}
?>