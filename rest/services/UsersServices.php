<?php

require_once "BaseServices.php";

class UsersServices extends BaseServices
{
    public function __construct()
    {
        parent::__construct(new UsersDao);
    }

    public function add($entity)
    {
        $entity['password'] = password_hash($entity['password'], PASSWORD_BCRYPT);
        return $this->dao->add($entity);
    }
}
