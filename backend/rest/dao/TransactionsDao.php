<?php

require_once "BaseDao.php";

class TransactionsDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Transactions");
    }
}
