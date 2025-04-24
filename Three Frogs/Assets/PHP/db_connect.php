<?php
$host = "localhost";
$user = "threefrogs";
$password = "Threefr0gs*";
$database = "threefrogs";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>