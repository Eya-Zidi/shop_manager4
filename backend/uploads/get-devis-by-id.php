<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once("../auth/connexion.php");

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "Aucun ID fourni."]);
    exit;
}

try {
    // Trouver le requestNumber de cette demande
    $stmt = $pdo->prepare("SELECT num FROM demande_achat WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        echo json_encode(["success" => false, "message" => "Demande non trouvée."]);
        exit;
    }

    $num = $row['num'];

    // Récupérer toutes les demandes avec le même num
    $stmt = $pdo->prepare("SELECT * FROM demande_achat WHERE num = ?");
    $stmt->execute([$num]);
    $devisList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "devis" => $devisList,
        "num" => $num
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
