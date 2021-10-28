<?php
class Branch
{
    private $conn;
    private $table_name = "branches";
    // propriety of a branch
    public $idBranch;
    public $address;
    public $city;
    public $switchboardNumber;

    // costruttore
    public function __construct($db)
    {
        $this->conn = $db;
    }
    // READ branches
    function read()
    {
        // select all
        $query = "SELECT
                        *
                    FROM
                   " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

}
?>