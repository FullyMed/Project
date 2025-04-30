// ===============================
// PHP for handling user login
// ===============================

<?php
// Start session with error handling
if (!session_start()) {
    header("Content-Type: application/json");
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to start session.",
        "debug" => "Session start failed"
    ]);
    exit;
}

header("Content-Type: application/json");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    // Include database connection
    require_once("db_connect.php");

    // Check if database connection is successful
    if (!$conn) {
        throw new Exception("Database connection failed: " . mysqli_connect_error());
    }

    // Check if POST data is available
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Missing email or password field."
        ]);
        exit;
    }

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Validate input
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "All fields are required."
        ]);
        exit;
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$stmt) {
        throw new Exception("Prepare statement failed: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Set session data
            $_SESSION['user'] = [
                "name" => $user['name'] ?? 'Unknown User',
                "email" => $user['email'],
                "avatar" => $user['avatar'] ?? ''
            ];
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "debug" => "Session set: " . print_r($_SESSION['user'], true)
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "error" => "Invalid email or password."
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "error" => "Invalid email or password."
        ]);
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Log error to file for debugging (optional, remove in production)
    error_log("Login error: " . $e->getMessage(), 0);

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Server error: " . $e->getMessage(),
        "debug" => "Exception caught"
    ]);
}
?>