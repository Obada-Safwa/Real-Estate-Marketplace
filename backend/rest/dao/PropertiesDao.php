<?php

require_once "BaseDao.class.php";

class PropertiesDao extends BaseDao {

    public function __construct() {
        parent::__construct("Properties");
    }
}
