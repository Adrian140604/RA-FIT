<?php
session_start();
require_once("layout/header.php");
require_once("Database.php");
require_once("functions/functions.php");



?>
<h1 class="text-center">Resultados</h1>
<div class="container mt-5">
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Fecha</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>Estrella 1</th>
                <th>Estrella 2</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        <?php
            $results=getResult();
            foreach ($results as $result) {
                $array_num= explode(",",$result["numeros"],$limit=PHP_INT_MAX);
                $array_star= explode(",",$result["estrellas"],$limit=PHP_INT_MAX);

                echo"
                <tr>

                <td>".$result["fecha_sorteo"]."</td>
                <td>".$array_num[0]."</td>
                <td>".$array_num[1]."</td>
                <td>".$array_num[2]."</td>
                <td>".$array_num[3]."</td>
                <td>".$array_num[4]."</td>
                <td>".$array_star[0]."</td>
                <td>".$array_star[1]."</td>

                 <td>
                    <a class='btn btn-primary' href='showWinner.php?fecha={$result["fecha_sorteo"]}&numeros={$result["numeros"]}&estrellas={$result["estrellas"]}'>Ver Ganadores</a>
                </td>
                </tr>
"
                ;
                

            }

        ?>
                

               

        </tbody>
    </table>

    <a href="index.php" class="btn btn-primary"><span class="glyphicon glyphicon-th-list"></span>Volver</a>
</div>
<?php
require_once("layout/footer.php");
?>