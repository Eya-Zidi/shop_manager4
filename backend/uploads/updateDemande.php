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
    $id = $_POST['id'] ?? null;
    $reference = $_POST['reference'] ?? '';
    $libelles = $_POST['libelles'] ?? '';
    $remise = $_POST['remise'] ?? '';
    $tva = $_POST['tva'] ?? '';
    $p_totale = $_POST['p_totale'] ?? '';
    $p_unitaire = $_POST['p_unitaire'] ?? '';
    $categorie = $_POST['categorie'] ?? '';
    $quantity = $_POST['quantity'] ?? '';


    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID manquant']);
        exit;
    }


    $stmt = $pdo->prepare("UPDATE demande_devis SET 
        reference = ?, 
        libelles = ?, 
        remise = ?, 
        TVA = ?, 
        p_totale = ?, 
        p_unitaire = ?, 
        categorie = ?, 
        quantity_location = ?, 

        WHERE id = ?");

    $success = $stmt->execute([
        $reference,
        $libelles,
        $remise,
        $tva,
        $p_totale,
        $p_unitaire,
        $categorie,
        $quantity,

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
