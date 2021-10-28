<?php
//headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/appointment.php';

$database = new Database();
$db = $database->getConnection();
$appointment = new Appointment($db);
$data = json_decode(file_get_contents("php://input"));
if(

 !empty($data->cdf) &&
 !empty($data->doctorId) &&
 !empty($data->branchId) &&
 !empty($data->day) &&
 !empty($data->timeSlot)
){
$appointment->cdf = $data->cdf;
$appointment->doctorId = $data->doctorId;
$appointment->branchId = $data->branchId;
$appointment->day = $data->day;
$appointment->timeSlot = $data->timeSlot;

$result=$appointment->create();
switch ($result){
    case "ERROR_MATCH_DOCTOR_BRANCH":
        //503 servizio non disponibile
        http_response_code(503);
        echo json_encode(array("message" => "Il Dottore selezionato non appartiene alla sede scelta"));
        break;
    case "ERROR_USER":
        //503 servizio non disponibile
        http_response_code(503);
        echo json_encode(array("message" => "Codice Fiscale non riconosciuto. Devi prima registrarti al servizio"));
        break;
    case "ERROR":
        //503 servizio non disponibile
        http_response_code(503);
        echo json_encode(array("message" => "Impossibile creare l'appuntamento."));
        break;
    case "ALREADY_RESERVED":
        //503 servizio non disponibile
        http_response_code(503);
        echo json_encode(array("message" => "TimeSlot già occupato."));
        break;
    case "ERROR_TIMESLOT":
        //503 servizio non disponibile
        http_response_code(503);
        echo json_encode(array("message" => "TimeSlot NON valido. Controllare gli orari del Dottore scelto"));
        break;
    default:
        http_response_code(201);
        echo json_encode(array("message" => "Appuntamento creato correttamente. Il codice è personale e unico. Usalo per modificare o cancellare la prenotazione in qualunque momento.","idAppointment" => $result));
        break;
}
}
else{
 //400 bad request
 http_response_code(400);
 echo json_encode(array("message" => "Impossibile creare l'appuntamento i dati sono incompleti."));
}
?>