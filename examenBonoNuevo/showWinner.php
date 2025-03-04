<?php 
session_start();
require_once("layout/header.php");
require_once("Database.php");
require_once("functions/functions.php");
            
?>


               <h1 class="text-center">Ganadores Con Estrellas</h1>
                        <div class="container mt-5">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Usuarios</th>
                                        <th>Numeros</th>
                                        <th>Estrellas</th>
                                        <th>Fecha</th>

                                    </tr>
                                </thead>
                                <tbody>

                                <?php
                    getGanadoresConEstrellas($_GET["fecha"],$_GET["numeros"],$_GET["estrellas"]);
        ?>
    </tbody>
    </table>
            
        <h1 class="text-center">Ganadores Sin Estrellas</h1>
                         <div class="container mt-5">
                             <table class="table table-striped">
                                 <thead>
                                     <tr>
                                         <th>Usuarios</th>
                                         <th>Numeros</th>
                                         <th>Estrellas</th>
                                         <th>Fecha</th>
 
                                     </tr>
                                 </thead>
                                 <tbody>
            <?php
            getGanadoresSinEstrellas($_GET["fecha"],$_GET["numeros"],$_GET["estrellas"]);

            
            ?>
        </tbody>
        </table>
        <?php
            
                

            

        ?>


<div div class="container mt-5">    <a href="./index.php" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span>Volver</a></div>
<?php require_once("layout/footer.php");?>
