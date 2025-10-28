<?php
// Incluir archivos de configuración
require_once '../config/database.php';
require_once '../config/config.php';

// Crear instancia de la base de datos
$database = new Database();
$db = $database->getConnection();

// Obtener reservas
$stmt = $db->query("SELECT * FROM reservas ORDER BY fecha_evento DESC");
$reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservaciones - Charlizze Eventos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css">
    <style>
        .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            padding: 48px 0 0;
            box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
        }
        .sidebar-sticky {
            position: relative;
            top: 0;
            height: calc(100vh - 48px);
            padding-top: .5rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Charlizze Eventos</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <a class="nav-link px-3" href="#">Cerrar sesión</a>
            </div>
        </div>
    </header>

    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="dashboard.php">
                                <i class="bi bi-speedometer2"></i> Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="reservations.php">
                                <i class="bi bi-calendar-check"></i> Reservaciones
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="settings.php">
                                <i class="bi bi-gear"></i> Configuración
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Reservaciones</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Exportar</button>
                        </div>
                    </div>
                </div>

                <!-- Filtros -->
                <div class="row mb-3">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <form class="row g-3">
                                    <div class="col-md-3">
                                        <label for="filtroFecha" class="form-label">Fecha</label>
                                        <input type="date" class="form-control" id="filtroFecha">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="filtroEstado" class="form-label">Estado</label>
                                        <select class="form-select" id="filtroEstado">
                                            <option value="">Todos</option>
                                            <option value="pendiente">Pendiente</option>
                                            <option value="confirmado">Confirmado</option>
                                            <option value="pagado">Pagado</option>
                                            <option value="cancelado">Cancelado</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="filtroTipo" class="form-label">Tipo de Evento</label>
                                        <select class="form-select" id="filtroTipo">
                                            <option value="">Todos</option>
                                            <option value="boda">Boda</option>
                                            <option value="cumpleaños">Cumpleaños</option>
                                            <option value="corporativo">Corporativo</option>
                                            <option value="social">Social</option>
                                            <option value="otros">Otros</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 d-flex align-items-end">
                                        <button type="submit" class="btn btn-primary w-100">Filtrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lista de reservas -->
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Invitados</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($reservas)): ?>
                                <tr>
                                    <td colspan="8" class="text-center">No hay reservaciones registradas</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($reservas as $reserva): ?>
                                    <tr>
                                        <td><?php echo $reserva['codigo_reserva']; ?></td>
                                        <td><?php echo $reserva['nombre_cliente']; ?></td>
                                        <td><?php echo $reserva['fecha_evento']; ?></td>
                                        <td><?php echo $reserva['tipo_evento']; ?></td>
                                        <td><?php echo $reserva['num_invitados']; ?></td>
                                        <td>$<?php echo number_format($reserva['monto_total'], 2); ?></td>
                                        <td>
                                            <span class="badge bg-<?php 
                                                echo $reserva['estado'] == 'confirmado' ? 'success' : 
                                                    ($reserva['estado'] == 'pendiente' ? 'warning' : 
                                                    ($reserva['estado'] == 'pagado' ? 'primary' : 'danger')); 
                                            ?>">
                                                <?php echo $reserva['estado']; ?>
                                            </span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#detalleModal<?php echo $reserva['id']; ?>">
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-outline-success" onclick="cambiarEstado('<?php echo $reserva['codigo_reserva']; ?>', 'confirmado')">
                                                    <i class="bi bi-check-circle"></i>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-outline-danger" onclick="cambiarEstado('<?php echo $reserva['codigo_reserva']; ?>', 'cancelado')">
                                                    <i class="bi bi-x-circle"></i>
                                                </button>
                                            </div>
                                            
                                            <!-- Modal de Detalle -->
                                            <div class="modal fade" id="detalleModal<?php echo $reserva['id']; ?>" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title">Detalle de Reserva: <?php echo $reserva['codigo_reserva']; ?></h5>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <h6>Información del Cliente</h6>
                                                                    <p><strong>Nombre:</strong> <?php echo $reserva['nombre_cliente']; ?></p>
                                                                    <p><strong>Email:</strong> <?php echo $reserva['email_cliente']; ?></p>
                                                                    <p><strong>Teléfono:</strong> <?php echo $reserva['telefono_cliente']; ?></p>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <h6>Información del Evento</h6>
                                                                    <p><strong>Fecha:</strong> <?php echo $reserva['fecha_evento']; ?></p>
                                                                    <p><strong>Horario:</strong> <?php echo $reserva['hora_inicio'] . ' - ' . $reserva['hora_fin']; ?></p>
                                                                    <p><strong>Tipo:</strong> <?php echo $reserva['tipo_evento']; ?></p>
                                                                    <p><strong>Invitados:</strong> <?php echo $reserva['num_invitados']; ?></p>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <h6>Paquete y Servicios</h6>
                                                                    <p><strong>Paquete:</strong> <?php echo ucfirst($reserva['paquete']); ?></p>
                                                                    <p><strong>Servicios Extra:</strong> 
                                                                        <?php 
                                                                        if (!empty($reserva['servicios_extra'])) {
                                                                            $servicios = json_decode($reserva['servicios_extra'], true);
                                                                            echo implode(', ', $servicios);
                                                                        } else {
                                                                            echo 'Ninguno';
                                                                        }
                                                                        ?>
                                                                    </p>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <h6>Información de Pago</h6>
                                                                    <p><strong>Monto Total:</strong> $<?php echo number_format($reserva['monto_total'], 2); ?></p>
                                                                    <p><strong>Estado:</strong> <?php echo ucfirst($reserva['estado']); ?></p>
                                                                </div>
                                                            </div>
                                                            <?php if (!empty($reserva['solicitudes_especiales'])): ?>
                                                                <hr>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <h6>Solicitudes Especiales</h6>
                                                                        <p><?php echo $reserva['solicitudes_especiales']; ?></p>
                                                                    </div>
                                                                </div>
                                                            <?php endif; ?>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                            <button type="button" class="btn btn-primary">Imprimir</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Función para cambiar el estado de una reserva
        function cambiarEstado(codigo, estado) {
            if (confirm('¿Está seguro de cambiar el estado de la reserva a ' + estado + '?')) {
                // En producción, aquí haríamos una llamada AJAX a la API
                fetch('../api/booking.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        codigo: codigo,
                        estado: estado
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Estado actualizado con éxito');
                        location.reload();
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar estado');
                });
            }
        }
    </script>
</body>
</html>