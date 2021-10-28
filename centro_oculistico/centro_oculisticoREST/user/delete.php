<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$data = json_decode(file_get_contents("php://input"));
if(
    !empty($data->cdf) &&
    !empty($data->passwd)
){
    $user->cdf = $data->cdf;
    $user->passwd = $data->passwd;


    $result=$user->delete();
    switch ($result){
        case "ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Impossibile eliminare l'utente. Password o cdf non corretto."));
            break;
        case "GENERIC_ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Errore. Riprova più tardi."));
            break;
        case "SUCCESS":
            http_response_code(200);
            echo json_encode(array("message" => "Utente cancellato correttamente."));
            break;
        default:
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => $result));
            break;
    }
}
else{
    //400 bad request
    http_response_code(400);
    echo json_encode(array("message" => "Impossibile eliminare l'utente i dati sono incompleti."));
}
?>