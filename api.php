<?php
include 'db.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all records
    $result = $conn->query("SELECT * FROM marriage_details");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} elseif ($method === 'POST') {
    // Add a new record
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO marriage_details (first_name, father_name, grandfather_name, tribe, village, event_date, day, city, hall_name, hall_address, bride_father_name, bride_village) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "ssssssssssss",
        $data['first_name'],
        $data['father_name'],
        $data['grandfather_name'],
        $data['tribe'],
        $data['village'],
        $data['event_date'],
        $data['day'],
        $data['city'],
        $data['hall_name'],
        $data['hall_address'],
        $data['bride_father_name'],
        $data['bride_village']
    );
    $stmt->execute();
    echo json_encode(['status' => 'success']);
} elseif ($method === 'DELETE') {
    // Delete a record
    $id = $_GET['id'];
    $conn->query("DELETE FROM marriage_details WHERE id = $id");
    echo json_encode(['status' => 'deleted']);
}
?>
