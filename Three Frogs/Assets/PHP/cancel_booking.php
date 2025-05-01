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
        "error" => "You must be logged in to cancel a booking."
    ]);
    exit;
}

$email = $_POST['email'] ?? '';
$date = $_POST['date'] ?? '';
$start = $_POST['start'] ?? '';
$end = $_POST['end'] ?? '';

if (empty($email) || empty($date) || empty($start) || empty($end)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "All fields are required."
    ]);
    exit;
}

if ($email !== $_SESSION['user']['email']) {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "error" => "Email does not match the logged-in user."
    ]);
    exit;
}

// Check if the booking exists
$checkBookingStmt = $conn->prepare("SELECT COUNT(*) FROM bookings WHERE email = ? AND date = ? AND start = ? AND end = ?");
$checkBookingStmt->bind_param("ssss", $email, $date, $start, $end);
$checkBookingStmt->execute();
$checkBookingStmt->bind_result($bookingCount);
$checkBookingStmt->fetch();
$checkBookingStmt->close();

if ($bookingCount == 0) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "error" => "Booking not found."
    ]);
    exit;
}

// Check cancel limit
$cancelStmt = $conn->prepare("
    SELECT COUNT(*) AS cancel_count 
    FROM cancellation_log 
    WHERE email = ? AND YEAR(cancel_date) = YEAR(CURRENT_DATE()) AND MONTH(cancel_date) = MONTH(CURRENT_DATE())
");
$cancelStmt->bind_param("s", $email);
$cancelStmt->execute();
$cancelResult = $cancelStmt->get_result();
$cancelCount = $cancelResult->fetch_assoc()['cancel_count'];
$cancelStmt->close();

if ($cancelCount >= 2) {
    http_response_code(403);
    echo json_encode([
        "success" => false,
        "error" => "You have reached the monthly cancellation limit (2 per month)."
    ]);
    exit;
}

// Delete the booking
$stmt = $conn->prepare("DELETE FROM bookings WHERE email = ? AND date = ? AND start = ? AND end = ?");
$stmt->bind_param("ssss", $email, $date, $start, $end);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        $logStmt = $conn->prepare("INSERT INTO cancellation_log (email, cancel_date) VALUES (?, CURDATE())");
        $logStmt->bind_param("s", $email);
        $logStmt->execute();
        $logStmt->close();

        http_response_code(200);
        echo json_encode([
            "success" => true,
            "remaining_cancel" => 2 - ($cancelCount + 1)
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "error" => "Booking not found."
        ]);
    }
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to cancel booking: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>