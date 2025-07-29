<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();

require_once("../auth/connexion.php");

// Champs Demande

$stmt = $pdo->prepare("SELECT * FROM employe WHERE id = ?");
$stmt->execute([ $_SESSION['user_id'] ]);
$user = $stmt->fetch();

$name          = $user['full_name'];
$lastName      = $user['full_name'];
$employeId     = $user["id"];
$tel           = $user["phone"];
$email         = $user["email"];
$requestDate   = $_POST['requestDate'] ?? '';
$requestNumber = $_POST['requestNumber'] ?? '';
$from          = $_POST['form'] ?? '';       // ⚠️ correspond à l'attribut name="form"
$to            = $_POST['to'] ?? '';
$description   = $_POST['description'] ?? '';
$requiredDate  = $_POST['requiredDate'] ?? '';
$estimatedCost = $_POST['EstimatedCost'] ?? ''; // ⚠️ majuscule comme dans ton formulaire
$justification = $_POST['justification'] ?? '';

// Champs Devis
$company        = $_POST['company'] ?? '';
$pieceNumber    = $_POST['pieceNumber'] ?? '';
$pieceName      = $_POST['pieceName'] ?? '';
$quantity       = $_POST['quantity'] ?? '';
$unitPrice      = $_POST['unitPrice'] ?? '';
$guarantees     = $_POST['guarantees'] ?? '';
$paymentMethod  = $_POST['paymentMethod'] ?? '';

try {
    $stmt = $pdo->prepare("INSERT INTO demande_devis (
        name, lastName, employeId, tel, email,
        requestDate, requestNumber, from_location, to_location,
        description, requiredDate, estimatedCost, justification,
        company, piece_number, piece_name, quantity, unit_price,
        guarantees, payment_method,situation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'Pending')");

    $stmt->execute([
        $name, $lastName, $employeId, $tel, $email,
        $requestDate, $requestNumber, $from, $to,
        $description, $requiredDate, $estimatedCost, $justification,
        $company, $pieceNumber, $pieceName, $quantity, $unitPrice,
        $guarantees, $paymentMethod
    ]);

    echo json_encode(["success" => true, "message" => "Demande + Devis added successfully."]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
