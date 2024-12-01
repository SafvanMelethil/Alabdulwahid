<?php
$host = 'localhost';
$user = 'root';
$password = ''; // Set your MySQL password
$database = 'marriage_db';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
