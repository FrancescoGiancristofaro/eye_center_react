<?php

class Appointment
{
    private $conn;
    private $table_name = "appointment";
    public $appointmentId;
    public $cdf;
    public $doctorId;
    public $branchId;
    public $day;
    public $timeSlot;

    // costruttore
    public function __construct($db)
    {
        $this->conn = $db;
    }

    private function generateRandomString($length = 8)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    // READ appointment
    function read()
    {
        // select all
        $query = "SELECT
                        *
                    FROM
                   " . $this->table_name . ",doctor,branches where " . $this->table_name . ".doctorId=doctor.doctorId and " . $this->table_name . ".branchId=branches.idBranch";
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

// CREARE appointment
    function create()
    {
        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->doctorId = htmlspecialchars(strip_tags($this->doctorId));
        $this->branchId = htmlspecialchars(strip_tags($this->branchId));
        $this->day = htmlspecialchars(strip_tags($this->day));

        $query1 = "SELECT * FROM doctor WHERE headOffice=:headOffice AND doctorId=:doctorId";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":headOffice", $this->branchId);
        $stmt1->bindParam(":doctorId", $this->doctorId);

        // execute query
        if (!($stmt1->execute() && $result3 = $stmt1->fetchAll())) {
            return "ERROR_MATCH_DOCTOR_BRANCH";
        }


        // check if user is valid
        $query1 = "SELECT * FROM user WHERE cdf=:cdf";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":cdf", $this->cdf);

        // execute query
        if (!($stmt1->execute() && $result3 = $stmt1->fetchAll())) {
            return "ERROR_USER";
        }

        //check if slot is valid
        $query1 = "SELECT * FROM timeSlot WHERE doctor_id=:doctor_id";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":doctor_id", $this->doctorId);

        // execute query
        if ($stmt1->execute() && $result3 = $stmt1->fetchAll()) {
            if ($result3) {
                foreach ($result3 as $item){
                    if (!in_array( $this->timeSlot,$item))
                        return "ERROR_TIMESLOT";
                }
                unset($item);
            }
        }

        $this->timeSlot = htmlspecialchars(strip_tags($this->timeSlot));


        //check if slot is empty
        $query1 = "SELECT * FROM " . $this->table_name . " WHERE doctorId=:doctorId AND branchId=:branchId AND day=:day AND timeSlot=:timeSlot";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":timeSlot", $this->timeSlot);
        $stmt1->bindParam(":doctorId", $this->doctorId);
        $stmt1->bindParam(":branchId", $this->branchId);
        $stmt1->bindParam(":day", $this->day);

        // execute query
        if ($stmt1->execute() && $result = $stmt1->fetchAll()) {
            if ($result) {
                return "ALREADY_RESERVED";
            }
        }


        //check for a unique id
        $query2 = "SELECT appointmentId FROM " . $this->table_name;
        $stmt2 = $this->conn->prepare($query2);
        if ($stmt2->execute() && $result1 = $stmt2->fetchAll()) {
            if ($result1) {
                do {
                    $this->appointmentId = $this->generateRandomString();
                } while (in_array($this->appointmentId, $result1));
            }
        }else{
            $this->appointmentId = $this->generateRandomString();
        }

//now create new appointment
        $query = "INSERT INTO " . $this->table_name . "
 SET appointmentId=:appointmentId, cdf=:cdf, doctorId=:doctorId, branchId=:branchId, day=:day, timeSlot=:timeSlot";
        $stmt = $this->conn->prepare($query);

// binding
        $stmt->bindParam(":appointmentId", $this->appointmentId);
        $stmt->bindParam(":cdf", $this->cdf);
        $stmt->bindParam(":doctorId", $this->doctorId);
        $stmt->bindParam(":branchId", $this->branchId);
        $stmt->bindParam(":day", $this->day);
        $stmt->bindParam(":timeSlot", $this->timeSlot);

        // execute query
        if ($stmt->execute()) {
            return $this->appointmentId;
        }

        return "ERROR";

    }


    // AGGIORNARE appointment
    function update()
    {
        $this->appointmentId = htmlspecialchars(strip_tags($this->appointmentId));
        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->doctorId = htmlspecialchars(strip_tags($this->doctorId));
        $this->branchId = htmlspecialchars(strip_tags($this->branchId));
        $this->day = htmlspecialchars(strip_tags($this->day));

        //check if match doctor branch is correct
        $query1 = "SELECT * FROM doctor WHERE headOffice=:headOffice AND doctorId=:doctorId";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":headOffice", $this->branchId);
        $stmt1->bindParam(":doctorId", $this->doctorId);

        // execute query
        if (!($stmt1->execute() && $result3 = $stmt1->fetchAll())) {
            return "ERROR_MATCH_DOCTOR_BRANCH";
        }

        //check if slot is valid
        $query1 = "SELECT * FROM timeSlot WHERE doctor_id=:doctor_id";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":doctor_id", $this->doctorId);

        // execute query
        if ($stmt1->execute() && $result3 = $stmt1->fetchAll()) {
            if ($result3) {
                foreach ($result3 as $item){
                    if (!in_array( $this->timeSlot,$item))
                        return "ERROR_TIMESLOT";
                }
                unset($item);
            }
        }

        $this->timeSlot = htmlspecialchars(strip_tags($this->timeSlot));

        //verify that the code is right
        $query1="SELECT * FROM ".$this->table_name." WHERE appointmentId=:appointmentId AND cdf=:cdf";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("appointmentId",$this->appointmentId);
        $stmt1->bindParam("cdf",$this->cdf);
        if (!($stmt1->execute() && $result= $stmt1->fetchAll())){
                return "ERROR";
        }

        //verify that the slot is empty
        $query1="SELECT * FROM ".$this->table_name." WHERE branchId=:branchId AND day=:day AND timeSlot=:timeSlot AND doctorId=:doctorId";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("branchId",$this->branchId);
        $stmt1->bindParam("doctorId",$this->doctorId);
        $stmt1->bindParam("day",$this->day);
        $stmt1->bindParam("timeSlot",$this->timeSlot);
        if (($stmt1->execute() && $result= $stmt1->fetchAll())){
            return "ALREADY_RESERVED";
        }

        //exec
        $query = "UPDATE " . $this->table_name . "
        SET doctorId=:doctorId, branchId=:branchId, day=:day, timeSlot=:timeSlot WHERE cdf=:cdf AND appointmentId=:appointmentId";

        $stmt = $this->conn->prepare($query);


        // binding
        $stmt->bindParam(":appointmentId", $this->appointmentId);
        $stmt->bindParam(":cdf", $this->cdf);
        $stmt->bindParam(":doctorId", $this->doctorId);
        $stmt->bindParam(":branchId", $this->branchId);
        $stmt->bindParam(":day", $this->day);
        $stmt->bindParam(":timeSlot", $this->timeSlot);

        // execute query
        if ($stmt->execute()) {
            return $this->appointmentId;
        }

        return "GENERIC_ERROR";

    }

    // CANCELLARE appointment
    function delete()
    {
        $this->appointmentId = htmlspecialchars(strip_tags($this->appointmentId));
        $this->cdf = htmlspecialchars(strip_tags($this->cdf));

        //verify that the code is right
        $query1="SELECT * FROM ".$this->table_name." WHERE appointmentId=:appointmentId AND cdf=:cdf";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("appointmentId",$this->appointmentId);
        $stmt1->bindParam("cdf",$this->cdf);
        if (!($stmt1->execute() && $result= $stmt1->fetchAll())){
            return "ERROR";
        }

        $query = "DELETE FROM " . $this->table_name . " WHERE appointmentId = ?";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->appointmentId);
        // execute query
        if ($stmt->execute()) {
            return "SUCCESS";
        }
        return "GENERIC_ERROR";

    }
}
