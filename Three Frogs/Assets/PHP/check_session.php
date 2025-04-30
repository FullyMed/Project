<?php
session_start();
header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (isset($_SESSION['user']) && !empty($_SESSION['user']['email'])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => [
            "name" => $_SESSION['user']['name'] ?? 'Unknown User',
            "email" => $_SESSION['user']['email'],
            "avatar" => $_SESSION['user']['avatar'] ?? ''
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