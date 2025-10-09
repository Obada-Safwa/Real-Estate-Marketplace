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

    public function addProperty($entity)
    {
        $image_url = $entity['image_url'];
        unset($entity['image_url']);

        $result = $this->add($entity);


        $property_images_dao = new PropertyImagesDao();

        $property_image['property_id'] = $result['id'];
        $property_image['image_url'] = $image_url;
        $property_images_dao->add($property_image);
        $result['image_url'] = $property_image['image_url'];
        return $result;
    }

    public function get_all()
    {
        $sql = $this->connection->prepare("SELECT * FROM properties join property_images on properties.id = property_images.property_id");
        $sql->execute();
        return $sql->fetchAll();
    }
}
