<?php


Flight::route("GET /property_images" , function() {
    Flight::json(Flight::property_images_service()->get_all());
});

Flight::route("GET /property_images/@id", function($id) {
    Flight::json(Flight::property_images_service()->get_by_id($id, "id"));
});

Flight::route("POST /property_images" , function() {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::property_images_service()->add($request));
});

Flight::route("DELETE /property_images/@id" , function($id) {
    Flight::json(Flight::property_images_service()->delete($id, "id"));
});

Flight::route("PUT /property_images/@id" , function($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::property_images_service()->update($request,$id,"id"));
});
?>  