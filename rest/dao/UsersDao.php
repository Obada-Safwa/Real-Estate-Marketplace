<?php

require_once "BaseDao.php";

class UsersDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Users");
    }


    public function get_by_email($email)
    {
        return $this->query(
            "SELECT * FROM Users WHERE email = :email",
            [":email" => $email]
        );
    }

    public function get_by_name($name)
    {
        return $this->query(
            "SELECT * FROM Users WHERE name = :name",
            [":name" => $name]
        );
    }

    public function get_all_users()
    {
        return $this->query(
            "SELECT * FROM Users",
            []
        );
    }
}
