<?php
require_once("../auth/connexion.php");

$company = $_POST['company'] ?? '';
$piece_name = $_POST['piece_name'] ?? '';
$quantity = $_POST['quantity'] ?? 0;
$unit_price = $_POST['unit_price'] ?? 0;

try {
    $stmt = $pdo->prepare("INSERT INTO devis (company, piece_name, quantity, unit_price) VALUES (?, ?, ?, ?)");
    $stmt->execute([$company, $piece_name, $quantity, $unit_price]);

    echo "Devis ajouté avec succès.";
} catch (PDOException $e) {
    echo "Erreur lors de l'ajout du devis : " . $e->getMessage();
}
?>
