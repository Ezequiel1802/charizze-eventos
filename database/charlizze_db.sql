-- BASE DE DATOS CHARLIZZE EVENTOS
CREATE DATABASE IF NOT EXISTS charlizze_eventos;
USE charlizze_eventos;

-- RESERVAS PRINCIPALES
CREATE TABLE IF NOT EXISTS reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_reserva VARCHAR(20) UNIQUE NOT NULL,
    nombre_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) NOT NULL,
    telefono_cliente VARCHAR(20),
    fecha_evento DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tipo_evento ENUM('boda', 'cumpleaños', 'corporativo', 'social', 'otros') NOT NULL,
    num_invitados INT NOT NULL,
    paquete ENUM('basico', 'premium', 'vip') NOT NULL,
    servicios_extra JSON,
    monto_total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'confirmado', 'pagado', 'cancelado') DEFAULT 'pendiente',
    solicitudes_especiales TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha_evento),
    INDEX idx_estado (estado)
);

-- SERVICIOS ADICIONALES
CREATE TABLE IF NOT EXISTS servicios_extra (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria ENUM('catering', 'decoracion', 'entretenimiento', 'otros'),
    activo BOOLEAN DEFAULT TRUE
);

-- DISPONIBILIDAD
CREATE TABLE IF NOT EXISTS disponibilidad (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL UNIQUE,
    bloqueado BOOLEAN DEFAULT FALSE,
    motivo VARCHAR(255),
    id_reserva INT NULL,
    FOREIGN KEY (id_reserva) REFERENCES reservas(id) ON DELETE SET NULL
);

-- CONFIGURACIÓN DEL SALÓN
CREATE TABLE IF NOT EXISTS configuracion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    tipo ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string'
);

-- USUARIOS ADMIN
CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'staff') NOT NULL DEFAULT 'staff',
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DATOS INICIALES

-- Insertar servicios extra de ejemplo
INSERT INTO servicios_extra (nombre, descripcion, precio, categoria, activo) VALUES
('Catering Premium', 'Servicio de catering con menú gourmet para eventos', 3000.00, 'catering', 1),
('Decoración Floral', 'Arreglos florales para todo el salón', 2000.00, 'decoracion', 1),
('DJ Profesional', 'Servicio de DJ con equipo profesional por 6 horas', 1500.00, 'entretenimiento', 1),
('Fotografía', 'Servicio de fotografía profesional', 2500.00, 'otros', 1),
('Meseros', 'Servicio de meseros (1 por cada 15 invitados)', 1000.00, 'catering', 1),
('Seguridad', 'Personal de seguridad para el evento', 1200.00, 'otros', 1);

-- Insertar configuraciones iniciales
INSERT INTO configuracion (clave, valor, tipo) VALUES
('nombre_salon', 'Charlizze Eventos', 'string'),
('direccion', 'Av. Principal #123, Ciudad', 'string'),
('telefono', '555-123-4567', 'string'),
('email', 'info@charlizze-eventos.com', 'string'),
('horario_atencion', 'Lunes a Viernes 9:00 - 18:00, Sábados 10:00 - 14:00', 'string'),
('capacidad_maxima', '200', 'number'),
('precio_basico', '5000', 'number'),
('precio_premium', '8000', 'number'),
('precio_vip', '12000', 'number'),
('dias_anticipacion', '30', 'number');

-- Insertar usuario administrador (password: admin123)
INSERT INTO usuarios (nombre, email, password, rol, activo) VALUES
('Administrador', 'admin@charlizze-eventos.com', '$2y$10$8tGmGzgvGmzwAZBwX.WQz.XBjMh1T5EWHtQS9U7o9wH3qPtMPRYSe', 'admin', 1);