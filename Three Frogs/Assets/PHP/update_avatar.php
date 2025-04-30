<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("db_connect.php");

// Check if user is logged in
if (!isset($_SESSION['user']) || empty($_SESSION['user']['email'])) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "error" => "You must be logged in to update your avatar."
    ]);
    exit;
}

// Get the user's email from session
$email = $_SESSION['user']['email'];

// Get the new avatar from POST data
$newAvatar = trim($_POST['avatar'] ?? '');

// Validate the avatar
if (empty($newAvatar)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Avatar selection is required."
    ]);
    exit;
}

// List of allowed avatars (based on Dashboard.html)
$allowedAvatars = [
    "Assets/Images/Avatars/Clam.jpg",
    "Assets/Images/Avatars/Cow.jpg",
    "Assets/Images/Avatars/Crab.jpg",
    "Assets/Images/Avatars/Dolphin.jpg",
    "Assets/Images/Avatars/Nemo.jpg",
    "Assets/Images/Avatars/Puffer.jpg",
    "Assets/Images/Avatars/Seahorse.jpg",
    "Assets/Images/Avatars/Sealion.jpg",
    "Assets/Images/Avatars/Shark.jpg",
    "Assets/Images/Avatars/Squid.jpg",
    "Assets/Images/Avatars/Stingray.jpg",
    "Assets/Images/Avatars/Turtle.jpg",
    "Assets/Images/Avatars/Whale.jpg"
];

// Validate that the selected avatar is in the allowed list
if (!in_array($newAvatar, $allowedAvatars)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Invalid avatar selection."
    ]);
    exit;
}

// Update the avatar in the database
$stmt = $conn->prepare("UPDATE users SET avatar = ? WHERE email = ?");
$stmt->bind_param("ss", $newAvatar, $email);

if ($stmt->execute()) {
    // Update the session with the new avatar
    $_SESSION['user']['avatar'] = $newAvatar;

    http_response_code(200);
    echo json_encode([
        "success" => true
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to update avatar: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>