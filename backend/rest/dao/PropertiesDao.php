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
    public function get_by_type($type)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE type = :type",
            [":type" => $type]
        );
    }

    public function get_by_category($category)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE category = :category",
            [":category" => $category]
        );
    }

    public function get_by_location($location)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE location = :location",
            [":location" => $location]
        );
    }

    public function get_by_status($status)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE status = :status",
            [":status" => $status]
        );
    }

    public function get_by_user_id($user_id)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE user_id = :user_id",
            [":user_id" => $user_id]
        );
    }

    public function get_by_title($title)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE title = :title",
            [":title" => $title]
        );
    }
    public function get_by_price($price)
    {
        return $this->query(
            "SELECT * FROM Properties WHERE price = :price",
            [":price" => $price]
        );
    }
}
