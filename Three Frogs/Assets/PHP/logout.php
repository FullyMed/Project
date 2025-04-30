// ===============================
// PHP for handling user logout
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
    // Clear all session variables
    session_unset();

    // Destroy the session
    if (!session_destroy()) {
        throw new Exception("Failed to destroy session.");
    }

    // Clear the session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Set response headers and status
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "debug" => "Session successfully destroyed and cookie cleared"
    ]);
} catch (Exception $e) {
    // Log error to file for debugging (optional, remove in production)
    error_log("Logout error: " . $e->getMessage(), 0);

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Server error: " . $e->getMessage(),
        "debug" => "Exception caught during logout"
    ]);
}
?>