<!DOCTYPE html>
<html lang="es">
<?php 
    $url = str_replace($_SERVER['DOCUMENT_ROOT'],"",__DIR__);
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BonoJaca</title>
    <!-- Enlace a Bootstrap CSS descargado -->
    <link rel="stylesheet" href="<?php echo $url . "/../bootstrap-5.3.3-dist/css/bootstrap.min.css";?>">

</head>

<nav class="navbar navbar-dark bg-primary">
    <div class="container-fluid">
        <?php if (!isset($_SESSION["user"])) { ?>
            <a class="nav-link" href="<?php echo $url . "/../user/login.php"; ?>">Login</a>
        <?php
            } else { ?>
             <a class="nav-link" href="<?php echo $url . "/../user/user.php?action=edit"; ?>">Editar</a>
             <a class="nav-link" href="<?php echo $url . "/../user/logout.php"; ?>">Logout</a>
            
        <?php } ?>
    </div>
</nav>