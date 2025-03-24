<?php


Flight::route("GET /users" , function() {
    Flight::json(Flight::users_service()->get_all());
});

Flight::route("GET /users/@id", function($id) {
    Flight::json(Flight::users_service()->get_by_id($id, "users_id"));
});

Flight::route("POST /users" , function() {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::users_service()->add($request));
});

Flight::route("DELETE /users/@id" , function($id) {
    Flight::json(Flight::users_service()->delete($id, "users_id"));
});

Flight::route("PUT /users/@id" , function($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::users_service()->update($request,$id,"users_id"));
});
?>  