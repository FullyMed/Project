<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

if (!$conn || $conn->connect_error) {
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed: " . ($conn ? $conn->connect_error : "no connection object")
    ]);
    exit();
}

$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$avatar   = trim($_POST['avatar'] ?? "Assets/Images/Avatars/Clam.jpg");

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "error" => "Name, email, and password are required."
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "error" => "Invalid email format."
    ]);
    exit();
}

// Check if email already exists
$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "error" => "Email already registered."
    ]);
    $checkStmt->close();
    $conn->close();
    exit();
}
$checkStmt->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)");

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error" => "Database error: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("ssss", $name, $email, $hashedPassword, $avatar);

$response = [];

if ($stmt->execute()) {
    $response["success"] = true;
} else {
    $response["success"] = false;
    $response["error"] = "Signup failed: " . $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);