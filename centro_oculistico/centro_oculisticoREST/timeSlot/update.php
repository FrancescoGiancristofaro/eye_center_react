<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/timeSlot.php';

$database = new Database();
$db = $database->getConnection();
$timeSlot = new TimeSlot($db);
$data = json_decode(file_get_contents("php://input"));
if(

    !empty($data->doctor_id) &&
    !empty($data->passwd) &&
    !(empty($data->slots))

){
    $timeSlot->doctor_id=$data->doctor_id;
    $timeSlot->passwd=$data->passwd;
    $timeSlot->slots=$data->slots;

    $result=$timeSlot->update();
    switch ($result){
        case "ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Impossibile aggiornare i time slot.Password non corretta."));
            break;
        case "GENERIC_ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Errore durante l'aggiornamento.Controlla il formato dell'orario(HH:MM:SS) oppure riprova più tardi."));
            break;
        case "SUCCESS":
            http_response_code(200);
            echo json_encode(array("message" => "Time Slots aggiornato correttamente."));
            break;
        default:
            http_response_code(503);
            echo json_encode(array("message" => $result));
            break;
    }
}
else{
    //400 bad request
    http_response_code(400);
    echo json_encode(array("message" => "Impossibile aggiornare i time slots. I dati sono incompleti."));
}
?>