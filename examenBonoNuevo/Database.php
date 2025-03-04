<?php
class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $host = 'php-db-1';
        $dbname = 'EuroMillonJaca'; //Nombre de la base de datos
        $username = 'root'; //Nombre del usuario
        $pass = 'root'; //Password del usuario
    
        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
        try {
            $this->connection = new PDO($dsn, $username, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}


