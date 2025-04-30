<?php
session_start();

// Clear all session variables
session_unset();

// Destroy the session
session_destroy();

// Clear the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Set response headers and status
header("Content-Type: application/json");
http_response_code(200);

// Return JSON response
echo json_encode([
    "success" => true
]);
?>