<?php
require_once __DIR__ . "/../config.php";

class BaseDao
{
    protected $connection;
    private $table_name;

    public function __construct($table_name)
    {
        $this->table_name = $table_name;
        try {
            $this->connection = new PDO(
                "mysql:host=" . Config::DB_HOST() . ";dbname=" . Config::DB_NAME() . ";port=" . Config::DB_PORT(),
                Config::DB_USER(),
                Config::DB_PASSWORD(),
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
            // echo "Successfully connected to the database";
        } catch (PDOException $e) {
            throw $e;
        }
    }
    protected function query($query, $params)
    {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params)
    {
        $results = $this->query($query, $params);
        return reset($results);
    }

    /**
     * Method used to get add entity to database
     * string $first_name: First name is the first name of the course
     */
    public function add($entity)
    {
        $query = "INSERT INTO " . $this->table_name . " (";
        foreach ($entity as $column => $value) {
            $query .= $column . ', ';
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ', ';
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity);
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    /**
     * Method used to update entity in database
     */
    public function update($entity, $id, $id_column = "id")
    {
        $query = "UPDATE " . $this->table_name . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "=:" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE " . $id_column . " = :id";
        $stmt = $this->connection->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
        return $entity;
    }


    /**
     * Method used to delete entity from database
     */
    public function delete($id)
    {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table_name . " WHERE id = :id");
        $stmt->bindValue(':id', $id); #prevent SQL injection
        $stmt->execute();
        return "User successfully deleted";
    }

    public function get_all()
    {
        $sql = $this->connection->prepare("SELECT * FROM " . $this->table_name);
        $sql->execute();
        return $sql->fetchAll();
    }

    public function get_by_id($id, $id_column_name)
    {
        $stmt = "SELECT * FROM " . $this->table_name . " WHERE  $id_column_name = :id";
        $stmt2 = $this->connection->prepare($stmt);
        $stmt2->execute(array(":id" => $id));
        return $stmt2->fetchAll();
    }
}
