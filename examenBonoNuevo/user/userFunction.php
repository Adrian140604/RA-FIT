<?php

//Comprueba si existe un usuario con ese password. Si no existe devuelve null. Si existe devuelve el role
function getRole($username, $password)
{
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->prepare('SELECT password, role FROM usuarios WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['password'])) {
            // Inicio de Sesión válido
            return $user['role'];
        } else {
            return null;
        }
    }catch (Exception $e){
        throw new Exception("Error de base de datos");
    }
    
}

function getUser($username){
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->prepare('SELECT username,password, direccion,idPoblacion,role FROM usuarios WHERE username = :username');
        $stmt->bindParam( ':username', $username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if($user)
        {
            return $user;

        }
    
    }catch (Exception $e){
        echo "Error específico: " . $e->getMessage();

    }
}
function getPoblaciones(){
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->query('SELECT *  FROM poblaciones ORDER BY poblacion ASC');
        $poblaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($poblaciones)
        {
            return $poblaciones;

        }
    
    }catch (Exception $e){
        echo "Error específico: " . $e->getMessage();

    }
}

function getDirecciones(){
    $db = Database::getInstance()->getConnection();
    if ($db == null) {
        throw new Exception("Error de base de datos");
    }
    try {
        $stmt = $db->query('SELECT direccion FROM usuarios'  );
        $direcciones = $stmt->fetchAll(PDO::FETCH_COLUMN);
        if($direcciones)
        {
            return $direcciones;

        }
    
    }catch (Exception $e){
        echo "Error específico: " . $e->getMessage();

    }
}

function addHistorico($username,$direccionActual,$direccionAnterior){
    $date=date("Y-m-d H:i:s");

    $db = Database::getInstance()->getConnection();
    $query = 'INSERT INTO historico (username, direccion_ant, direccion_act, fecha) VALUES (:username, :direccion_ant, :direccion_act, :fecha)';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':direccion_ant', $direccionAnterior);
    $stmt->bindParam(':direccion_act', $direccionActual);
    $stmt->bindParam(':fecha', $date);

    try{
        $stmt->execute();
    }catch(Exception $e){
        die("Error: ".$e->getMessage());
    }
    if($stmt->rowCount()>0){
        return true;
    }
}

function editUser ($username, $direccion, $idPoblacion) {
    $db = Database::getInstance()->getConnection();

        $query = "UPDATE usuarios SET direccion = :direccion, idPoblacion = :idPoblacion WHERE username = :username;"; // Query to execute in DB
        $stmt = $db->prepare($query); // Prepare the query
        $stmt->bindParam(':username', $username); // Assing value to the params
        $stmt->bindParam(':direccion', $direccion); // Assing value to the params
        $stmt->bindParam(':idPoblacion', $idPoblacion); // Assing value to the params
        $stmt->execute(); // Execute the query
        if ($stmt->rowCount() <= 0) {
            return false;

        }
        else {
            return true;
        }


}