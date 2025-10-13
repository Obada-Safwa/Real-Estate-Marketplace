<?php

require_once "BaseServices.php";

class ReportsServices extends BaseServices
{
    public function __construct()
    {
        parent::__construct(new ReportsDao);
    }

    public function alter_status($status, $id)
    {
        return $this->dao->alter_status($status, $id);
    }
}
