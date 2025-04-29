<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

if (!$conn || $conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed: " . ($conn ? $conn->connect_error : "no connection object")
    ]);
    exit();
}

$name     = trim($_POST['name'] ?? '');
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$password = trim($_POST['password'] ?? '');
$avatar   = trim($_POST['avatar'] ?? "Assets/Images/Avatars/Clam.jpg");

if (empty($name) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Name, email, and password are required."
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Invalid email format."
    ]);
    exit();
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Password must be at least 6 characters long."
    ]);
    exit();
}

$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    http_response_code(409);
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
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database error: " . $conn->error
    ]);
    exit();
}

$stmt->bind_param("ssss", $name, $email, $hashedPassword, $avatar);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Signup failed: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();