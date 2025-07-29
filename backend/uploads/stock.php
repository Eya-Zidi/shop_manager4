<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
session_start();

require_once("../auth/connexion.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Utilisateur non connecté"
    ]);
    exit;
}

$employeId = $_SESSION['user_id'];

// Récupération des infos utilisateur
$stmt = $pdo->prepare("SELECT * FROM employe WHERE id = ?");
$stmt->execute([$employeId]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(["success" => false, "message" => "Employé introuvable"]);
    exit;
}

$name        = $user['full_name'];
$lastName    = $user['full_name'];
$tel         = $user["phone"];
$email       = $user["email"];
$requestDate   = $_POST['requestDate'] ?? '';


$stmt = $pdo->query("SELECT MAX(CAST(requestNumber AS UNSIGNED)) as max_request FROM demande_devis");
$maxRow = $stmt->fetch();
$requestNumber = $maxRow && $maxRow['max_request'] !== null ? $maxRow['max_request'] + 1 : 1;


$from          = $_POST['form'] ?? '';
$to            = $_POST['to'] ?? '';
$description   = $_POST['description'] ?? '';
$requiredDate  = $_POST['requiredDate'] ?? '';
$estimatedCost = $_POST['EstimatedCost'] ?? '';
$justification = $_POST['justification'] ?? '';

// Devis 1
$company       = $_POST['company'] ?? '';
$categorie     = $_POST['categorie'] ?? '';
$pieceNumber   = $_POST['pieceNumber'] ?? '';
$pieceName     = $_POST['pieceName'] ?? '';
$quantity      = $_POST['quantity'] ?? '';
$unitPrice     = $_POST['unitPrice'] ?? '';
$guarantees    = $_POST['guarantees'] ?? '';
$paymentMethod = $_POST['paymentMethod'] ?? '';

// Devis 2
$company2       = $_POST['company2'] ?? '';
$categorie2     = $_POST['categorie2'] ?? '';
$pieceNumber2   = $_POST['pieceNumber2'] ?? '';
$pieceName2     = $_POST['pieceName2'] ?? '';
$quantity2      = $_POST['quantity2'] ?? '';
$unitPrice2     = $_POST['unitPrice2'] ?? '';
$guarantees2    = $_POST['guarantees2'] ?? '';
$paymentMethod2 = $_POST['paymentMethod2'] ?? '';

// Devis 3
$company3       = $_POST['company3'] ?? '';
$categorie3     = $_POST['categorie3'] ?? '';
$pieceNumber3   = $_POST['pieceNumber3'] ?? '';
$pieceName3     = $_POST['pieceName3'] ?? '';
$quantity3      = $_POST['quantity3'] ?? '';
$unitPrice3     = $_POST['unitPrice3'] ?? '';
$guarantees3    = $_POST['guarantees3'] ?? '';
$paymentMethod3 = $_POST['paymentMethod3'] ?? '';

try {
    $insertQuery = "INSERT INTO demande_devis (
        name, lastName, employeId, tel, email,
        requestDate, requestNumber, from_location, to_location,
        description, requiredDate, estimatedCost, justification,
        company, categorie, piece_number, piece_name, quantity, unit_price,
        guarantees, payment_method, situation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')";


    $stmt = $pdo->prepare($insertQuery);
    $stmt->execute([
        $name, $lastName, $employeId, $tel, $email,
        $requestDate, $requestNumber, $from, $to,
        $description, $requiredDate, $estimatedCost, $justification,
        $company, $categorie, $pieceNumber, $pieceName, $quantity, $unitPrice,
        $guarantees, $paymentMethod
    ]);

    
    if (!empty($company2)) {
        $stmt = $pdo->prepare($insertQuery);
        $stmt->execute([
            $name, $lastName, $employeId, $tel, $email,
            $requestDate, $requestNumber, $from, $to,
            $description, $requiredDate, $estimatedCost, $justification,
            $company2, $categorie2, $pieceNumber2, $pieceName2, $quantity2, $unitPrice2,
            $guarantees2, $paymentMethod2
        ]);
    }

  
    if (!empty($company3)) {
        $stmt = $pdo->prepare($insertQuery);
        $stmt->execute([
            $name, $lastName, $employeId, $tel, $email,
            $requestDate, $requestNumber, $from, $to,
            $description, $requiredDate, $estimatedCost, $justification,
            $company3, $categorie3, $pieceNumber3, $pieceName3, $quantity3, $unitPrice3,
            $guarantees3, $paymentMethod3
        ]);
    }

    echo json_encode(["success" => true, "message" => "Demande + Devis ajoutés avec succès."]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $e->getMessage()]);
}
