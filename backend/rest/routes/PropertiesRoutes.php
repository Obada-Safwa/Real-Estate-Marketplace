<?php


Flight::route("GET /properties", function () {
    Flight::json(Flight::properties_service()->get_all());
});

Flight::route("GET /properties/@id", function ($id) {
    Flight::json(Flight::properties_service()->get_by_id($id, "id"));
});

Flight::route("POST /properties", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::properties_service()->add($request));
});

Flight::route("DELETE /properties/@id", function ($id) {
    Flight::json(Flight::properties_service()->delete($id, "id"));
});

Flight::route("PUT /properties/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::properties_service()->update($request, $id, "id"));
});
