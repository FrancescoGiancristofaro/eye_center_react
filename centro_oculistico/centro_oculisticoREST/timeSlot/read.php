<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/timeSlot.php';
// creiamo un nuovo oggetto Database e ci colleghiamo al nostro database
$database = new Database();
$db = $database->getConnection();
// Creiamo un nuovo oggetto TimeSlot
$timeSlot = new TimeSlot($db);
// query products
$stmt = $timeSlot->read();
$num = $stmt->rowCount();
// se vengono trovati timeslot nel database
if($num>0){
    // array di timeslot
    $timeSlot_arr = array();
    $timeSlot_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $timeSlot_item = array(
            "doctor_id" => $doctor_id,
            "slot1" => $slot1,
            "slot2" => $slot2,
            "slot3" => $slot3,
            "slot4" => $slot4,
            "slot5" => $slot5,
            "slot6" => $slot6,
            "slot7" => $slot7,
            "slot8" => $slot8,
            "slot9" => $slot9,
            "slot10" => $slot10,
            "slot11" => $slot11,
            "slot12" => $slot12,
            "slot13" => $slot13,
            "slot14" => $slot14,

        );
        array_push($timeSlot_arr, $timeSlot_item);
    }
    http_response_code(200);
    echo json_encode($timeSlot_arr);
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "Nessun TimeSlot Trovato.")
    );
}
?>