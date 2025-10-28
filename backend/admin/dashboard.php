<?php
// Incluir archivos de configuración
require_once '../config/database.php';
require_once '../config/config.php';

// Simulación de autenticación (en producción usaríamos sesiones reales)
$autenticado = true;

// Crear instancia de la base de datos
$database = new Database();
$db = $database->getConnection();

// Obtener estadísticas
$stats = [];

// Total de reservas
$stmt = $db->query("SELECT COUNT(*) as total FROM reservas");
$stats['total_reservas'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Reservas por estado
$stmt = $db->query("SELECT estado, COUNT(*) as total FROM reservas GROUP BY estado");
$stats['reservas_por_estado'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Ingresos totales
$stmt = $db->query("SELECT SUM(monto_total) as total FROM reservas WHERE estado != 'cancelado'");
$stats['ingresos_totales'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

// Próximos eventos (próximos 30 días)
$stmt = $db->prepare("SELECT * FROM reservas WHERE fecha_evento BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY) ORDER BY fecha_evento");
$stmt->execute();
$proximos_eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Charlizze Eventos</title>
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
        .stat-card {
            border-left: 4px solid #0d6efd;
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
                            <a class="nav-link active" href="dashboard.php">
                                <i class="bi bi-speedometer2"></i> Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="reservations.php">
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
                    <h1 class="h2">Dashboard</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Exportar</button>
                        </div>
                    </div>
                </div>

                <!-- Estadísticas -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Total Reservas</h5>
                                <h2><?php echo $stats['total_reservas']; ?></h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card" style="border-left-color: #198754;">
                            <div class="card-body">
                                <h5 class="card-title">Reservas Confirmadas</h5>
                                <h2>
                                    <?php 
                                    $confirmadas = 0;
                                    foreach ($stats['reservas_por_estado'] as $estado) {
                                        if ($estado['estado'] == 'confirmado') {
                                            $confirmadas = $estado['total'];
                                            break;
                                        }
                                    }
                                    echo $confirmadas;
                                    ?>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card" style="border-left-color: #dc3545;">
                            <div class="card-body">
                                <h5 class="card-title">Reservas Pendientes</h5>
                                <h2>
                                    <?php 
                                    $pendientes = 0;
                                    foreach ($stats['reservas_por_estado'] as $estado) {
                                        if ($estado['estado'] == 'pendiente') {
                                            $pendientes = $estado['total'];
                                            break;
                                        }
                                    }
                                    echo $pendientes;
                                    ?>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card" style="border-left-color: #ffc107;">
                            <div class="card-body">
                                <h5 class="card-title">Ingresos Totales</h5>
                                <h2>$<?php echo number_format($stats['ingresos_totales'], 2); ?></h2>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Próximos eventos -->
                <h2>Próximos Eventos</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($proximos_eventos)): ?>
                                <tr>
                                    <td colspan="6" class="text-center">No hay eventos próximos</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($proximos_eventos as $evento): ?>
                                    <tr>
                                        <td><?php echo $evento['codigo_reserva']; ?></td>
                                        <td><?php echo $evento['nombre_cliente']; ?></td>
                                        <td><?php echo $evento['fecha_evento']; ?></td>
                                        <td><?php echo $evento['tipo_evento']; ?></td>
                                        <td>
                                            <span class="badge bg-<?php 
                                                echo $evento['estado'] == 'confirmado' ? 'success' : 
                                                    ($evento['estado'] == 'pendiente' ? 'warning' : 
                                                    ($evento['estado'] == 'pagado' ? 'primary' : 'danger')); 
                                            ?>">
                                                <?php echo $evento['estado']; ?>
                                            </span>
                                        </td>
                                        <td>
                                            <a href="reservations.php?id=<?php echo $evento['id']; ?>" class="btn btn-sm btn-outline-primary">
                                                <i class="bi bi-eye"></i>
                                            </a>
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
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>
</html>