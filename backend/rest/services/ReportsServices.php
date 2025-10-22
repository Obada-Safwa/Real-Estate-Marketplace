<?php
require_once "BaseServices.php";
require_once "PropertiesServices.php";

class ReportsServices extends BaseServices
{
    private $propertiesServices;
    public function __construct()
    {
        parent::__construct(new ReportsDao);
        $this->propertiesServices = new PropertiesServices();
    }

    public function alter_status($status, $id)
    {
        return $this->dao->alter_status($status, $id);
    }

    public function add($entity)
    {
        $property = $this->propertiesServices->get_by_id($entity['property_id']);

        if (isset($property[0])) {
            $property = $property[0];
        }

        $entity['receiver_id'] = $property['user_id'];
        $entity['title'] = $property['title'];

        return $this->dao->add($entity);
    }

    public function get_report_by_reciever_id($reciever_id)
    {
        return $this->dao->get_report_by_reciever_id($reciever_id);
    }
}
