<?php

require_once "BaseDao.php";

class ReportsDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Reports");
    }
}
