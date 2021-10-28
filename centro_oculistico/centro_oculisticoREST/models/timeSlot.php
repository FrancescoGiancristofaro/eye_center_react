<?php
class TimeSlot
{
    private $conn;
    private $table_name = "timeSlot";
    // propriety of a timeSlot
    public $doctor_id;
    public $slot1;
    public $slot2;
    public $slot3;
    public $slot4;
    public $slot5;
    public $slot6;
    public $slot7;
    public $slot8;
    public $slot9;
    public $slot10;
    public $slot11;
    public $slot12;
    public $slot13;
    public $slot14;
    public $slots;
    public $passwd;

    // costruttore
    public function __construct($db)
    {
        $this->conn = $db;
    }
    // READ timeSlot
    function read()
    {
        // select all
        $query = "SELECT DISTINCT 
                        doctor_id,slot1,slot2,slot3,slot4,slot5,slot6,slot7,slot8,slot9,slot10,slot11,slot12,slot13,slot14
                    FROM
                   " . $this->table_name .",doctor where ".$this->table_name.".doctor_id=doctor.doctorId ";
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    //UPDATE TIMESLOTS
    function update(){
        $this->doctor_id=htmlspecialchars(strip_tags($this->doctor_id));
        $this->passwd=htmlspecialchars(strip_tags($this->passwd));

        //check if password is right
        $query="SELECT * FROM doctor WHERE passwd=:passwd AND doctorId=:doctorId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":passwd", $this->passwd);
        $stmt->bindParam(":doctorId", $this->doctor_id);
        if (!($stmt->execute() && $result= $stmt->fetchAll())){
            return "ERROR";
        }
        //update
        $query = "UPDATE " . $this->table_name . "
        SET ";
        foreach ($this->slots as $key=>$item){
            if ($key>0){
                $query .= "slot" . $key . "='" . $item . "', ";
            }
        }
        unset($item,$key);
        $query=substr($query,0,-2);
        $query.=" WHERE doctor_id=:doctor_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":doctor_id",$this->doctor_id);

        // execute query
        if ($stmt->execute()) {
            return "SUCCESS";
        }

        return "GENERIC_ERROR";



    }

}
?>