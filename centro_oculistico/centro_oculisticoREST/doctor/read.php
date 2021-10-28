<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// includiamo database.php e branch.php per poterli usare
include_once '../config/database.php';
include_once '../models/doctor.php';
// creiamo un nuovo oggetto Database e ci colleghiamo al nostro database
$database = new Database();
$db = $database->getConnection();
// Creiamo un nuovo oggetto doctor
$doctor = new Doctor($db);
// query products
$stmt = $doctor->read();
$num = $stmt->rowCount();
// se vengono trovati dottori nel database
if($num>0){
    // array di dottori
    $doctor_arr = array();
    $doctor_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $doctor_item = array(
            "doctorId" => $doctorId,
            "name" => $name,
            "surname" => $surname,
            "dateOfBirth" => $dateOfBirth,
            "gender" => $gender,
            "email" => $email,
            "phoneNumber" => $phoneNumber,
            "headOffice" => $address.",".$city,
            "passwd" => $passwd
        );
        array_push($doctor_arr, $doctor_item);
    }
    http_response_code(200);
    echo json_encode($doctor_arr);
}else{
    http_response_code(404);
    echo json_encode(
        array("message" => "Nessun Dottore Trovato.")
    );
}
?>