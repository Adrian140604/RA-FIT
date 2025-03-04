<?php 
session_start();
require_once("Database.php");
require_once("functions/functions.php");

if (!isset($_SESSION["user"])) {
    echo '<div class="alert alert-danger text-center">Debes registrarte para poder apostar.</div>';
    exit();  // Detener la ejecución del script
}

$errors = [];  // Variable para almacenar mensajes de error

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validar fecha
    $date = date("Y-m-d");
    $fecha = $_POST['fecha'];

    // Validar números principales (deben estar entre 1 y 50) y verificar duplicados
    $numeros = [];
    for ($i = 1; $i <= 5; $i++) {
        $numero = $_POST["numero$i"];
        if (in_array($numero, $numeros)) {
            echo '<div class="alert alert-success text-center">No puedes seleccionar números duplicados.</div>';

        }
        $numeros[] = $numero;
    }

    // Verificar que cada número sea mayor que el anterior
    for ($i = 1; $i < count($numeros); $i++) {
        if ($numeros[$i] <= $numeros[$i - 1]) {
            echo '<div class="alert alert-success text-center">Cada número debe ser mayor que el anterior.</div>';

        }
    }

    // Validar estrellas (deben estar entre 1 y 10) y verificar duplicados
    $estrellas = [];
    for ($i = 1; $i <= 2; $i++) {
        $estrella = $_POST["estrella$i"];
        if ($estrella < 1 || $estrella > 10) {
            $errors[] = 'Las estrellas deben estar entre 1 y 10.';
            echo '<div class="alert alert-success text-center">Cada estrella debe ser mayor que la anterior.</div>';

        }
        if (in_array($estrella, $estrellas)) {
            $errors[] = 'No puedes seleccionar estrellas duplicadas.';
            echo '<div class="alert alert-success text-center">Cada estrella debe ser mayor que la anterior.</div>';

            
        }
        $estrellas[] = $estrella;
    }

    // Verificar que cada estrella sea mayor que la anterior
    for ($i = 1; $i < count($estrellas); $i++) {
        if ($estrellas[$i] <= $estrellas[$i - 1]) {
            echo '<div class="alert alert-success text-center">Cada estrella debe ser mayor que la anterior.</div>';

        }
    }

    // Si no hay errores, guardar los datos en la base de datos
    if (empty($errors)) {
        addSorteo($_SESSION["user"], implode(",", $numeros), implode(",", $estrellas), $fecha);
        echo '<div class="alert alert-success text-center">¡Boleto enviado exitosamente!</div>';
    }
}

require_once("layout/header.php");
$date = date("Y-m-d");
?>

<div class="container mt-5">
    <h1 class="text-center mb-4">Ingresar Boleto de Euromillones Jacarandeño</h1>

   
    <div class="row justify-content-center">
        <div class="col-md-3">
            <form method="post" id="betForm">
                <!-- Fecha -->
                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha del boleto</label>
                    <input type="date" id="fecha" min="<?= $date ?>" name="fecha" class="form-control" required>
                </div>

                <!-- Números principales -->
                <div class="mb-3">
                    <label class="form-label">Números (del 1 al 50)</label>
                    <div class="row g-2">
                        <?php for ($i = 1; $i <= 5; $i++): ?>
                            <div class="col-8">
                                <input type="number" name="numero<?= $i ?>" class="form-control" 
                                       placeholder="N° <?= $i ?>" required min="1" max="50" 
                                       value="<?= $_POST["numero$i"] ?? '' ?>">
                            </div>
                        <?php endfor; ?>
                    </div>
                </div>

                <!-- Estrellas -->
                <div class="mb-3">
                    <label class="form-label">Estrellas (del 1 al 10)</label>
                    <div class="row g-2">
                        <?php for ($i = 1; $i <= 2; $i++): ?>
                            <div class="col-8">
                                <input type="number" name="estrella<?= $i ?>" class="form-control" 
                                       placeholder="Estrella <?= $i ?>" required min="1" max="10" 
                                       value="<?= $_POST["estrella$i"] ?? '' ?>">
                            </div>
                        <?php endfor; ?>
                    </div>
                </div>

                <!-- Botón enviar -->
                <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-lg">Enviar boleto</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="container mt-5">    
    <a href="./index.php" class="btn btn-primary">
        <span class="glyphicon glyphicon-th-list"></span> Volver
    </a>
</div>

<?php require_once("layout/footer.php"); ?>
