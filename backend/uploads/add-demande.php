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
$lastName    = $user['last_name'];
$tel         = $user["phone"];
$email       = $user["email"];
$matricule   = $_POST['matricule'] ?? '';


// Génération d’un requestNumber unique
$stmt = $pdo->query("SELECT MAX(CAST(num AS UNSIGNED)) as max_num FROM demande_achat");
$maxRow = $stmt->fetch();
$num = $maxRow && $maxRow['max_num'] !== null ? $maxRow['max_num'] + 1 : 1;

// Devis 1
$p_totale      = $_POST['p_totale'] ?? '';
$quantity      = $_POST['quantite'] ?? '';
$p_unitaire    = $_POST['p_unitaire'] ?? '';
$libelles      = $_POST['libelles'] ?? '';
$tva           = $_POST['TVA'] ?? '';
$categorie     = $_POST['categorie'] ?? '';
$remise        = $_POST['remise'] ?? '';
$reference     = $_POST['reference'] ?? '';
$situation     = 'pending'; // valeur par défaut

// Devis 2
$p_totale2     = $_POST['p_totale2'] ?? '';
$quantity2     = $_POST['quantity2'] ?? '';
$p_unitaire2   = $_POST['p_unitaire2'] ?? '';
$libelles2     = $_POST['libelles2'] ?? '';
$tva2          = $_POST['TVA2'] ?? '';
$categorie2    = $_POST['categorie2'] ?? '';
$remise2       = $_POST['remise2'] ?? '';
$reference2    = $_POST['reference2'] ?? '';
$situation2    = 'pending';

// Devis 3
$p_totale3     = $_POST['p_totale3'] ?? '';
$quantity3     = $_POST['quantity3'] ?? '';
$p_unitaire3   = $_POST['p_unitaire3'] ?? '';
$libelles3     = $_POST['libelles3'] ?? '';
$tva3          = $_POST['TVA3'] ?? '';
$categorie3    = $_POST['categorie3'] ?? '';
$remise3       = $_POST['remise3'] ?? '';
$reference3    = $_POST['reference3'] ?? '';
$situation3    = 'pending';

try {
    $insertQuery = "INSERT INTO demande_achat (
        name, lastName, matricule, tel, email, num,
        p_totale, quantity, p_unitaire, libelles, TVA, categorie, remise, reference, situation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($insertQuery);
    $stmt->execute([
        $name, $lastName, $matricule, $tel, $email, $num,
        $p_totale, $quantity, $p_unitaire, $libelles, $tva, $categorie, $remise, $reference, $situation
    ]);

    // Si Devis 2 existe (vérifie p_totale2 comme indicateur)
    if (!empty($p_totale2)) {
        $stmt = $pdo->prepare($insertQuery);
        $stmt->execute([
            $name, $lastName, $matricule, $tel, $email, $num,
            $p_totale2, $quantity2, $p_unitaire2, $libelles2, $tva2, $categorie2, $remise2, $reference2, $situation2
        ]);
    }

    // Si Devis 3 existe
    if (!empty($p_totale3)) {
        $stmt = $pdo->prepare($insertQuery);
        $stmt->execute([
            $name, $lastName, $matricule, $tel, $email, $num,
            $p_totale3, $quantity3, $p_unitaire3, $libelles3, $tva3, $categorie3, $remise3, $reference3, $situation3
        ]);
    }

    echo json_encode(["success" => true, "message" => "Demande + devis ajoutés avec succès."]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $e->getMessage()]);
}
