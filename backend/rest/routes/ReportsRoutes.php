<?php

/**
 * @OA\Get(
 *      path="/reports",
 *      tags={"Reports"},
 *      summary="Get all reports",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="A list of reports",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   @OA\Property(property="id", type="integer", example=6),
 *                   @OA\Property(property="user_id", type="integer", example=1),
 *                   @OA\Property(property="property_id", type="integer", example=1),
 *                   @OA\Property(property="reason", type="string", example="cant exit"),
 *                   @OA\Property(property="status", type="string", example="reviewed"),
 *                   @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-31 17:05:39")
 *               )
 *           )
 *       )
 * )
 */
Flight::route("GET /reports", function () {
    Flight::json(Flight::reports_service()->get_all());
});

/**
 * @OA\Get(
 *      path="/reports/{id}",
 *      tags={"Reports"},
 *      summary="Get a report by ID",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the report",
 *          @OA\Schema(type="integer", example=6)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Report details",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="id", type="integer", example=6),
 *               @OA\Property(property="user_id", type="integer", example=1),
 *               @OA\Property(property="property_id", type="integer", example=1),
 *               @OA\Property(property="reason", type="string", example="cant exit"),
 *               @OA\Property(property="status", type="string", example="reviewed"),
 *               @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-31 17:05:39")
 *           )
 *       )
 * )
 */
Flight::route("GET /reports/@id", function ($id) {
    Flight::json(Flight::reports_service()->get_by_id($id, "id"));
});

/**
 * @OA\Post(
 *      path="/reports",
 *      tags={"Reports"},
 *      summary="Create a new report",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              required={"user_id", "property_id", "reason", "status", "created_at"},
 *              @OA\Property(property="user_id", type="integer", example=1),
 *              @OA\Property(property="property_id", type="integer", example=1),
 *              @OA\Property(property="reason", type="string", example="cant exit"),
 *              @OA\Property(property="status", type="string", example="reviewed"),
 *              @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-31 17:05:39")
 *          )
 *      ),
 *      @OA\Response(
 *           response=201,
 *           description="Report successfully created"
 *       )
 * )
 */
Flight::route("POST /reports", function () {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::reports_service()->add($request));
});

/**
 * @OA\Delete(
 *      path="/reports/{id}",
 *      tags={"Reports"},
 *      summary="Delete a report",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the report to delete",
 *          @OA\Schema(type="integer", example=6)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Report successfully deleted"
 *       )
 * )
 */
Flight::route("DELETE /reports/@id", function ($id) {
    Flight::json(Flight::reports_service()->delete($id, "id"));
});

/**
 * @OA\Put(
 *      path="/reports/{id}",
 *      tags={"Reports"},
 *      summary="Update a report",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the report to update",
 *          @OA\Schema(type="integer", example=6)
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="reason", type="string", example="updated reason"),
 *              @OA\Property(property="status", type="string", example="pending")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Report successfully updated"
 *       )
 * )
 */
Flight::route("PUT /reports/@id", function ($id) {
    $request = Flight::request()->data->getData();
    Flight::json(Flight::reports_service()->update($request, $id, "id"));
});
