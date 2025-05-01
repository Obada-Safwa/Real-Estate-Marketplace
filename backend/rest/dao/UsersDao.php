<?php

require_once "BaseDao.php";

class UsersDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Users");
    }
}
