<?php
session_start();
require_once("../layout/header.php");
require_once("../Database.php");
require_once("./userFunction.php");

if(isset($_GET["action"])&&$_GET["action"]=="edit"){
    $user=getUser($_SESSION["user"]);
    $poblaciones=getPoblaciones();
}
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $direcciones=getDirecciones();
    if(in_array($_POST["direccion"], $direcciones) && $user["direccion"]!=$_POST["direccion"]){
        echo"<div class='alert alert-danger'>La direccion ya pertenece a un usuario</div>";
    }
    else{
        addHistorico($user["username"],$_POST["direccion"],$user["direccion"]);
        $edicion=editUser($user["username"],$_POST["direccion"],$_POST["idPoblacion"]);
        if($edicion){
            echo"<div class='alert alert-success'>El usuario ha sido editado.</div>";

    }
    
}
}
?>


<div class="container mt-5">
    <?php
    if(isset($_GET["action"])){
        if($_GET["action"]=="edit"){
            echo'<h1 class="text-center mt-5">Editar Usuario</h1>';
        }}
        else{
            echo '<h1 class="text-center mt-5">Añadir Usuario</h1>';
        }
    
    
    
    ?>
    
    <form action="" method="POST" >
        <!-- Username -->
        <div class="mb-3">
            <label for="username" class="form-label">Nombre de Usuario</label>
            <input type="text" id="username" name="username" value="<?php  echo isset($_GET["action"])&&$_GET["action"]=="edit"? $user["username"]:"" ?>" <?php echo isset($_GET["action"])&&$_GET["action"]=="edit"? 'readonly':"" ?> class="form-control" >
        </div>
        <!-- Contraseña -->
        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" value="<?php echo isset($_GET["action"])&& $_GET["action"]=="edit"?"********":"" ?>" name="password" class="form-control"  <?php echo isset($_GET["action"])&& $_GET["action"]=="edit"? 'readonly':"" ?>>
        </div>

        <!-- Dirección -->
        <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" class="form-control" name="direccion" id="direccion" value="<?php echo isset($_GET["action"])&&$_GET["action"]=="edit"? $user["direccion"]:"" ?>">
        </div>

        <!-- Población -->
        <div class="mb-3">
            <label for="idPoblacion" class="form-label">Población</label>
            <select id="idPoblacion" name="idPoblacion" class="form-select">
                <?php foreach ($poblaciones as $poblacion ) {
                            $selected = ($_GET["action"] == "edit" && $poblacion["id"] == $user["idPoblacion"]) ? 'selected' : '';
                         echo'<option value="'.$poblacion["id"].'"'.$selected.'>'.$poblacion["poblacion"].'</option>';
                }?>
            </select>
        </div>

        <!-- Rol -->
        <div class="mb-3">
            <label for="role" class="form-label">Rol</label>
            <input type="text" id="role" name="role" value="<?php echo isset($_GET["action"])&& $_GET["action"]=="edit"? $user["role"]:"" ?>" class="form-control"  <?php echo isset($_GET["action"])&&$_GET["action"]=="edit"? 'readonly':"" ?>>
        </div>

        <!-- Botón enviar -->
        <div class="text-center">
            <button type="submit" class="btn btn-primary btn-lg">Guardar Usuario</button>
        </div>
    </form>
</div>


<div div class="container mt-5">
    <a href="../index.php" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span>Volver</a>
</div>
<?php require_once("../layout/footer.php"); ?>