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
        // Make sure property_id exists
        if (empty($entity['property_id'])) {
            throw new Exception("property_id is required to create a report");
        }

        // Fetch property details
        $property = $this->propertiesServices->get_by_id($entity['property_id']);
        if (empty($property) || empty($property['user_id'])) {
            throw new Exception("Invalid property or property owner not found");
        }

        // Correctly add receiver_id
        $entity['receiver_id'] = $property['user_id'];
        return $this->dao->add($entity);
    }
}
