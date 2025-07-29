<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../auth/connexion.php");

// Retrieve POST data
$fullName = isset($_POST['fullName']) ? trim($_POST['fullName']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
$confirmPassword = isset($_POST['confirmPassword']) ? $_POST['confirmPassword'] : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$imma = isset($_POST['imma']) ? trim($_POST['imma']) : '';
$dept = isset($_POST['dept']) ? trim($_POST['dept']) : '';

// Basic validation
if (empty($fullName) || empty($password) || empty($email) || empty($phone) || empty($role) || empty($imma) || empty($dept)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if ($password !== $confirmPassword) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
    exit;
}

// Optional: hash the password
// $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO employe (full_name, password, email, phone, role, employee_id, department) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$fullName, $password, $email, $phone, $role, $imma, $dept]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Account created successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create account.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>