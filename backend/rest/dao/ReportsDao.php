<?php

require_once "BaseDao.class.php";

class ReportsDao extends BaseDao {

    public function __construct() {
        parent::__construct("Reports");
    }
}
