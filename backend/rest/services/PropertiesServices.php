<?php

require_once "BaseServices.php";

class PropertiesServices extends BaseServices
{
    public function __construct()
    {
        parent::__construct(new PropertiesDao);
    }

    public function addProperty($property)
    {
        return $this->dao->addProperty($property);
    }

    public function get_report_with_property($id)
    {
        return $this->dao->get_report_with_property($id);
    }
}
