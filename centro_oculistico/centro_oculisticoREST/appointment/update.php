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
    !empty($data->timeSlot) &&
    !empty($data->appointmentId)
){
    $appointment->cdf = $data->cdf;
    $appointment->doctorId = $data->doctorId;
    $appointment->branchId = $data->branchId;
    $appointment->day = $data->day;
    $appointment->timeSlot = $data->timeSlot;
    $appointment->appointmentId = $data->appointmentId;


    $result=$appointment->update();
    switch ($result){
        case "ERROR_MATCH_DOCTOR_BRANCH":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Il Dottore selezionato non appartiene alla sede scelta"));
            break;
        case "ALREADY_RESERVED":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Impossibile aggiornare l'appuntamento. Time Slot già occupato"));
            break;
        case "ERROR_TIMESLOT":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Time Slot NON valido."));
            break;
        case "ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Impossibile aggiornare l'appuntamento. Codice di prenotazione o Codice Fiscale errato"));
            break;
        case "GENERIC_ERROR":
            //503 servizio non disponibile
            http_response_code(503);
            echo json_encode(array("message" => "Errore. Riprova più tardi."));
            break;
        default:
            http_response_code(200);
            echo json_encode(array("message" => "Appuntamento aggiornato correttamente. Il codice di prenotazione è rimasto invariato. Usalo per modificare o cancellare la prenotazione in qualunque momento.","idAppointment" => $result));
            break;
    }
}
else{
    //400 bad request
    http_response_code(400);
    echo json_encode(array("message" => "Impossibile aggiornare l'appuntamento i dati sono incompleti."));
}
?>
