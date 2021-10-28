<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// includiamo database.php e user.php per poterli usare
include_once '../config/database.php';
include_once '../models/user.php';
// creiamo un nuovo oggetto Database e ci colleghiamo al nostro database
$database = new Database();
$db = $database->getConnection();
// Creiamo un nuovo oggetto user
$user = new User($db);
$data = json_decode(file_get_contents("php://input"));
if (
    !empty($data->cdf) &&
    !empty($data->passwd)
){
    $user->cdf = $data->cdf;
    $user->passwd = $data->passwd;
    // query products
    $stmt = $user->read();
    $num = $stmt->rowCount();
// se vengono trovati user nel database
    if($num>0){
        // array di user
        $user_arr = array();
        $user_arr = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $user_item = array(
                "cdf" => $cdf,
                "name" => $name,
                "surname" => $surname,
                "dateOfBirth" => $dateOfBirth,
                "email" => $email,
                "phoneNumber" => $phoneNumber,
                "passwd" => $passwd,
                "gender" => $gender
            );
            array_push($user_arr, $user_item);
        }
        http_response_code(200);
        echo json_encode($user_arr);
    }else{
        http_response_code(404);
        echo json_encode(
            array("message" => "Nessun Utente Trovato.")
        );
    }
}else{
    http_response_code(400);
    echo json_encode(
        array("message" => "Richiesta respinta.I dati sono incompleti.")
    );
}

?>