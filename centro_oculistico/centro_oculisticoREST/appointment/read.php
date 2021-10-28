<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/appointment.php';
// creiamo un nuovo oggetto Database e ci colleghiamo al nostro database
$database = new Database();
$db = $database->getConnection();
$appointment = new Appointment($db);
// query products
$stmt = $appointment->read();
$num = $stmt->rowCount();
if($num>0){
    $appointment_arr = array();
    $appointment_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $appointment_item = array(
            "appointmentId" => $appointmentId,
            "cdf" => $cdf,
            "doctorId" => $name." ".$surname,
            "branchId" => $address." ".$city,
            "day" => $day,
            "timeSlot" => $timeSlot

        );
        array_push($appointment_arr, $appointment_item);
    }
    http_response_code(200);
    echo json_encode($appointment_arr);
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "Nessun appuntamento Trovato.")
    );
}
?>