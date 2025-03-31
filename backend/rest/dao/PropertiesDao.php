<?php

require_once "BaseDao.php";

class PropertiesDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Properties");
    }
}
