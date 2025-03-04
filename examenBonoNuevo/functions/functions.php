<?php

//Comprueba si existe un usuario con ese password. Si no existe devuelve null. Si existe devuelve el role
function getResult()
{
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->query("SELECT * FROM resultados ORDER BY resultados.fecha_sorteo DESC");
       
       return $stmt->fetchAll(PDO::FETCH_ASSOC);
      
    }catch (Exception $e){
        throw new Exception("Error de base de datos");
    }
    
}

function getGanadoresConEstrellas($fecha,$numeros,$estellas)
{
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->prepare("SELECT username,numeros,estrellas FROM boletos WHERE fecha_sorteo = :fecha_sorteo and numeros=:numeros and estrellas=:estrellas");
        $stmt->bindParam(':fecha_sorteo', $fecha);
        $stmt->bindParam(':numeros', $numeros);
        $stmt->bindParam(':estrellas', $estellas);

        $stmt->execute();  // Ejecuta la consulta preparada

        $ganadores=$stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($ganadores as $ganador ) {
            $asteriscos="";
        
            echo'<tr>';
                for($i=0;$i<strlen($ganador["username"]);$i++){
                    $asteriscos=$asteriscos."*";
                }
                if(isset($_SESSION["user"])&&$_SESSION["user"]==$ganador["username"]){
                    $asteriscos=$ganador["username"];
                }
                echo'
                <td>'.$asteriscos.'</td>
                <td>'.$ganador["numeros"].'</td>
                <td>'.$ganador["estrellas"].'</td>
                <td>'.$fecha.'</td>
    
            </tr> ;
                   
        
            ';
                
            
        }
       
      
    }catch (Exception $e){
        throw new Exception("Error de base de datos: " . $e->getMessage());
    }
    
}
function getGanadoresSinEstrellas($fecha,$numeros,$estellas)
{
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->prepare("SELECT username, numeros, estrellas FROM boletos WHERE fecha_sorteo = :fecha_sorteo AND numeros = :numeros AND estrellas != :estrellas");
        $stmt->bindParam(':fecha_sorteo', $fecha);
        $stmt->bindParam(':numeros', $numeros);
        $stmt->bindParam(':estrellas', $estellas);
        $stmt->execute();  // Ejecuta la consulta preparada

       
       $ganadores=$stmt->fetchAll(PDO::FETCH_ASSOC);
       foreach ($ganadores as $ganador ) {
        $asteriscos="";
    
        echo'<tr>';
            for($i=0;$i<strlen($ganador["username"]);$i++){
                $asteriscos=$asteriscos."*";
            }
            if(isset($_SESSION["user"])&&$_SESSION["user"]==$ganador["username"]){
                $asteriscos=$ganador["username"];
            }
            echo'
            <td>'.$asteriscos.'</td>
            <td>'.$ganador["numeros"].'</td>
            <td>'.$ganador["estrellas"].'</td>
            <td>'.$fecha.'</td>

        </tr> ;
               
    
        ';
            
        
    }
      
    }catch (Exception $e){
        throw new Exception("Error de base de datos: " . $e->getMessage());
    }
    
}

function addSorteo($username,$numeros,$estrellas,$fecha){

    $db = Database::getInstance()->getConnection();
    $query = 'INSERT INTO boletos (username, numeros, estrellas, fecha_sorteo) VALUES (:username, :numeros, :estrellas, :fecha_sorteo)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':numeros', $numeros);
    $stmt->bindParam(':estrellas', $estrellas);
    $stmt->bindParam(':fecha_sorteo', $fecha);

    try{
        $stmt->execute();
    }catch(Exception $e){
        die("Error: ".$e->getMessage());
    }
    if($stmt->rowCount()>0){
        return true;
    }
}




