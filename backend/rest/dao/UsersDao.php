<?php

require_once "BaseDao.php";

class UsersDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("users");
    }


    public function get_by_email($email)
    {
        return $this->query(
            "SELECT * FROM users WHERE email = :email",
            [":email" => $email]
        );
    }

    public function get_by_name($name)
    {
        return $this->query(
            "SELECT * FROM users WHERE name = :name",
            [":name" => $name]
        );
    }

    public function get_all_users()
    {
        return $this->query(
            "SELECT * FROM users",
            []
        );
    }
}
