<?php

require_once "BaseDao.php";

class PropertiesDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Properties");
    }

    public function get_by_price_range($min_price, $max_price)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE price BETWEEN :min_price AND :max_price",
            [":min_price" => $min_price, ":max_price" => $max_price]
        );
    }
}
