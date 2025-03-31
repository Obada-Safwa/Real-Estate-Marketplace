<?php


Flight::route("GET /reports", function () {
    Flight::json(Flight::reports_service()->get_all());
});

Flight::route("GET /reports/@id", function ($id) {
    Flight::json(Flight::reports_service()->get_by_id($id, "id"));
});

Flight::route("POST /reports", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::reports_service()->add($request));
});

Flight::route("DELETE /reports/@id", function ($id) {
    Flight::json(Flight::reports_service()->delete($id, "id"));
});

Flight::route("PUT /reports/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::reports_service()->update($request, $id, "id"));
});
