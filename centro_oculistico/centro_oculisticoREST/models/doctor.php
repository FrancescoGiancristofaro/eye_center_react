<?php
class Doctor
{
    private $conn;
    private $table_name = "doctor";
    // propriety of a doctor
    public $doctorId;
    public $name;
    public $surname;
    public $gender;
    public $dateOfBirth;
    public $email;
    public $phoneNumber;
    public $headOffice;
    public $new_passwd;
    public $passwd;

    // costruttore
    public function __construct($db)
    {
        $this->conn = $db;
    }
    // READ doctor
    function read()
    {
        // select all
        $query = "SELECT
                        *
                    FROM
                   " . $this->table_name .",branches where headOffice=idBranch";
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    public  function  update(){


        $this->doctorId = htmlspecialchars(strip_tags($this->doctorId));
        $this->passwd = htmlspecialchars(strip_tags($this->passwd));

        //verify that the pass is right
        $query1="SELECT * FROM ".$this->table_name." WHERE doctorId=:doctorId AND passwd=:passwd";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("passwd",$this->passwd);
        $stmt1->bindParam("doctorId",$this->doctorId);
        if (!($stmt1->execute() && $result= $stmt1->fetchAll())){
            return "ERROR";
        }

        //update
        $query = "UPDATE " . $this->table_name . "
        SET ";

        if (isset($this->email)) {
            $this->email = htmlspecialchars(strip_tags($this->email));
            $query.="email=:email, ";
        }
        if (isset($this->phoneNumber)) {
            $this->phoneNumber = htmlspecialchars(strip_tags($this->phoneNumber));
            $query.="phoneNumber=:phoneNumber, ";
        }
        if (isset($this->new_passwd)) {
            $this->new_passwd = htmlspecialchars(strip_tags($this->new_passwd));
            $query.="passwd=:passwd, ";
        }
        $query=substr($query,0,-2);
        $query.=" WHERE doctorId=:doctorId";

        $stmt = $this->conn->prepare($query);


        // binding
        $stmt->bindParam(":doctorId", $this->doctorId);
        if (isset($this->email))
            $stmt->bindParam(":email", $this->email);
        if (isset($this->new_passwd))
            $stmt->bindParam(":passwd", $this->new_passwd);
        if (isset($this->phoneNumber))
            $stmt->bindParam(":phoneNumber", $this->phoneNumber);

        // execute query
        if ($stmt->execute()) {
            return "SUCCESS";
        }

        return "GENERIC_ERROR";

    }
}
?>