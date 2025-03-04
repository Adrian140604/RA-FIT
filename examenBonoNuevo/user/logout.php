<?php
session_start();

session_destroy();
$url = str_replace($_SERVER['DOCUMENT_ROOT'],"",__DIR__) . "/../index.php";

header("Location: $url");

           