<?php

require_once "BaseDao.php";

class ReportsDao extends BaseDao
{

    public function __construct()
    {
        parent::__construct("Reports");
    }

    public function get_by_user_id($user_id)
    {
        return $this->query(
            "SELECT * FROM Reports WHERE user_id = :user_id",
            [":user_id" => $user_id]
        );
    }

    public function get_by_property_id($property_id)
    {
        return $this->query(
            "SELECT * FROM Reports WHERE property_id = :property_id",
            [":property_id" => $property_id]
        );
    }

    public function get_by_status($status)
    {
        return $this->query(
            "SELECT * FROM Reports WHERE status = :status",
            [":status" => $status]
        );
    }

    public function alter_status($status, $id)
    {
        return $this->query(
            "UPDATE Reports SET status = :status WHERE id = :id",
            [":status" => $status, ":id" => $id]
        );
    }

    public function get_report_by_reciever_id($reciever_id)
    {
        return $this->query(
            "SELECT * FROM Reports WHERE reciever_id = :reciever_id",
            [":reciever_id" => $reciever_id]
        );
    }
}
