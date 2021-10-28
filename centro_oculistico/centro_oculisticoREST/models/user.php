<?php

class User
{
    private $conn;
    private $table_name = "user";
    public $cdf;
    public $name;
    public $surname;
    public $gender;
    public $dateOfBirth;
    public $email;
    public $phoneNumber;
    public $passwd;
    public $new_passwd;

    // costruttore
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {
        // select only user's info
        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->passwd = htmlspecialchars(strip_tags($this->passwd));
        $query = "SELECT
                        *
                    FROM
                   " . $this->table_name . " where ".$this->table_name.".cdf=:cdf and ".$this->table_name.".passwd=:passwd";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":cdf",$this->cdf);
        $stmt->bindParam(":passwd",$this->passwd);
        // execute query
        if ($stmt->execute()){
            return $stmt;
        }

    }

    function create()
    {

        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->gender = htmlspecialchars(strip_tags($this->gender));
        $this->dateOfBirth = htmlspecialchars(strip_tags($this->dateOfBirth));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->phoneNumber = htmlspecialchars(strip_tags($this->phoneNumber));
        $this->passwd = htmlspecialchars(strip_tags($this->passwd));


//check if user already exists
        $query1 = "SELECT * FROM " . $this->table_name . " WHERE cdf=:cdf";
        $stmt1 = $this->conn->prepare($query1);
        // binding
        $stmt1->bindParam(":cdf", $this->cdf);

        // execute query
        if ($stmt1->execute() && $result = $stmt1->fetchAll()) {
            if ($result) {
                return "ALREADY_EXISTS";
            }
        }


//now create new user
        $query = "INSERT INTO " . $this->table_name . "
 SET  cdf=:cdf,name=:name,surname=:surname,gender=:gender,dateOfBirth=:dateOfBirth,email=:email,phoneNumber=:phoneNumber,passwd=:passwd";
        $stmt = $this->conn->prepare($query);

// binding
        $stmt->bindParam(":cdf", $this->cdf);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam("surname", $this->surname);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":dateOfBirth", $this->dateOfBirth);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":passwd", $this->passwd);
        $stmt->bindParam(":phoneNumber", $this->phoneNumber);

        // execute query
        if ($stmt->execute()) {
            return "SUCCESS";
        }

        return "ERROR";

    }


    // AGGIORNARE user
    function update()
    {

        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->passwd = htmlspecialchars(strip_tags($this->passwd));

        //verify that the pass is right
        $query1="SELECT * FROM ".$this->table_name." WHERE cdf=:cdf AND passwd=:passwd";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("passwd",$this->passwd);
        $stmt1->bindParam("cdf",$this->cdf);
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
        $query.=" WHERE cdf=:cdf";

        $stmt = $this->conn->prepare($query);


        // binding
        $stmt->bindParam(":cdf", $this->cdf);
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

    // CANCELLARE user
    function delete()
    {
        $this->cdf = htmlspecialchars(strip_tags($this->cdf));
        $this->passwd = htmlspecialchars(strip_tags($this->passwd));

        //verify that the pass is right
        $query1="SELECT * FROM ".$this->table_name." WHERE cdf=:cdf AND passwd=:passwd";
        $stmt1 = $this->conn->prepare($query1);
        $stmt1->bindParam("passwd",$this->passwd);
        $stmt1->bindParam("cdf",$this->cdf);
        if (!($stmt1->execute() && $result= $stmt1->fetchAll())){
            return "ERROR";
        }

        $query = "DELETE FROM " . $this->table_name . " WHERE cdf = ?";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $this->cdf);
        // execute query
        if ($stmt->execute()) {
            return "SUCCESS";
        }
        return "GENERIC_ERROR";

    }
}
