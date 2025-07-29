<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("../auth/connexion.php");


$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $id             = $_POST['id'] ?? null;
    $name           = $_POST['name'] ?? '';
    $lastName       = $_POST['lastName'] ?? '';
    $employeId     = $_POST['employeeId'] ?? '';
    $tel            = $_POST['tel'] ?? '';
    $email          = $_POST['email'] ?? '';
    $requestDate    = $_POST['requestDate'] ?? '';
    $requestNumber  = $_POST['requestNumber'] ?? '';
    $from           = $_POST['from'] ?? '';
    $to             = $_POST['to'] ?? '';
    $description    = $_POST['description'] ?? '';
    $requiredDate   = $_POST['requiredDate'] ?? '';
    $estimatedCost  = $_POST['estimatedCost'] ?? '';
    $justification  = $_POST['justification'] ?? '';


    $company        = $_POST['company'] ?? '';
    $pieceNumber    = $_POST['piece_number'] ?? '';
    $pieceName      = $_POST['piece_name'] ?? '';
    $quantity       = $_POST['quantity'] ?? '';
    $unitPrice      = $_POST['unit_price'] ?? '';
    $guarantees     = $_POST['guarantees'] ?? '';
    $paymentMethod  = $_POST['payment_method'] ?? '';

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID manquant']);
        exit;
    }

    $stmt = $pdo->prepare("
        UPDATE demande_devis SET 
            name = ?, lastName = ?, employeId = ?, tel = ?, email = ?, 
            requestDate = ?, requestNumber = ?, from_location = ?, to_location = ?, 
            description = ?, requiredDate = ?, estimatedCost = ?, justification = ?,
            company = ?, piece_number = ?, piece_name = ?, quantity = ?, unit_price = ?, 
            guarantees = ?, payment_method = ?
        WHERE id = ?
    ");

    $success = $stmt->execute([
        $name, $lastName, $employeId, $tel, $email,
        $requestDate, $requestNumber, $from, $to,
        $description, $requiredDate, $estimatedCost, $justification,
        $company, $pieceNumber, $pieceName, $quantity, $unitPrice,
        $guarantees, $paymentMethod,
        $id
    ]);

    echo json_encode([
        'success' => $success,
        'message' => $success ? 'Demande mise à jour avec succès.' : 'Échec de la mise à jour.'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erreur SQL : ' . $e->getMessage()
    ]);
}
