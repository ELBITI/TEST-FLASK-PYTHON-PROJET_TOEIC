
<?php
// Ajouter les en-têtes CORS
header("Access-Control-Allow-Origin: *"); // Autoriser toutes les origines
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiques
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Autoriser les en-têtes spécifiques

// Vérifier si la méthode est OPTIONS (pré-vol CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Connexion à MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "toeic";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Vérifier si une image est envoyée
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    // Chemin de l'image temporaire
    $image_path = $_FILES['image']['tmp_name'];

    // Appeler Flask pour traiter l'image
    $flask_url = "http://localhost:5000/process";
    $cfile = new CURLFile($image_path, $_FILES['image']['type'], $_FILES['image']['name']);

    $data = ['image' => $cfile];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $flask_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    // Décoder la réponse Flask
    $result = json_decode($response, true);

    if ($result && $result['status'] === 'success') {
        // Enregistrer les dimensions dans MySQL
        $width = $result['width'];
        $height = $result['height'];
        $sql = "INSERT INTO results (width, height) VALUES ($width, $height)";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Résultat enregistré dans la base de données."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erreur MySQL : " . $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => $result['message'] ?? "Erreur inconnue."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Aucune image envoyée."]);
}

$conn->close();
?>
