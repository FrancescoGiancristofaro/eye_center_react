<?php

//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/doctor.php';

$database = new Database();
$db = $database->getConnection();
$doctor = new Doctor($db);
$data = json_decode(file_get_contents("php://input"));
if (

    !empty($data->doctorId) &&
    !empty($data->passwd) &&
    !(empty($data->email) && empty($data->phoneNumber) && empty($data->new_passwd))

) {
    $doctor->doctorId = $data->doctorId;
    $doctor->passwd = $data->passwd;
    if (!empty($data->new_passwd))
        $doctor->new_passwd = $data->new_passwd;
    if (!empty($data->email))
        $doctor->email = $data->email;
    if (!empty($data->phoneNumber))
        $doctor->phoneNumber = $data->phoneNumber;

    $result = $doctor->update();
    switch ($result) {
        case "ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Impossibile aggiornare i dati del Dottore.Password non corretta."));
            break;
        case "GENERIC_ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Errore durante l'aggiornamento. Riprova più tardi."));
            break;
        case "SUCCESS":
            http_response_code(200);
            echo json_encode(array("message" => "Dati Dottore aggiornati correttamente."));
            break;
        default:
            http_response_code(503);
            echo json_encode(array("message" => $result));
            break;
    }
} else {
    //400 bad request
    http_response_code(400);
    echo json_encode(array("message" => "Impossibile aggiornare i dati del Dottore,sono incompleti."));
}
