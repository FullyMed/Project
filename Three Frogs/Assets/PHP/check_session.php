<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

if (!session_start()) {
    echo json_encode([
        "loggedIn" => false,
        "error" => "Failed to start session"
    ]);
    exit;
}

if (isset($_SESSION['user']) && !empty($_SESSION['user']['email'])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => [
            "name" => $_SESSION['user']['name'] ?? 'Unknown User',
            "email" => $_SESSION['user']['email'],
            "avatar" => $_SESSION['user']['avatar'] ?? 'Assets/Images/Avatars/Clam.jpg'
        ],
        "debug" => "Session found: " . print_r($_SESSION['user'], true)
    ]);
} else {
    echo json_encode([
        "loggedIn" => false,
        "debug" => "Session not found"
    ]);
}
?>