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
    Flight::auth_middleware()->authorizeRole('admin');
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
    Flight::auth_middleware()->authorizeRole('admin');
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
    // Flight::auth_middleware()->authorizeRole('admin');
    $request = Flight::request()->data->getData();
    $user = Flight::get('user');
    $request['user_id'] = $user->id;
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
    Flight::auth_middleware()->authorizeRole('admin');
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
    Flight::auth_middleware()->authorizeRole('admin');
    $request = Flight::request()->data->getData();
    Flight::json(Flight::reports_service()->update($request, $id, "id"));
});

/**
 * @OA\Patch(
 *     path="/reports/{status}/{id}",
 *     summary="Update the status of a report",
 *     description="Allows an admin to update the status of a report by ID.",
 *     tags={"Reports"},
 *     security={
 *          {"ApiKey": {}}
 *      },
 *     @OA\Parameter(
 *         name="status",
 *         in="path",
 *         required=true,
 *         description="New status value for the report",
 *         @OA\Schema(type="string")
 *     ),
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the report to update",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Report status updated successfully",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Report status updated successfully"),
 *             @OA\Property(property="data", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Unauthorized - only admin can perform this action"
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Invalid input"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error"
 *     )
 * )
 */
Flight::route("PATCH /reports/@status/@id", function ($status, $id) {
    Flight::auth_middleware()->authorizeRole('admin');
    $result = Flight::reports_service()->alter_status($status, $id);
    Flight::json([
        "message" => "Report status successfully altered",
        "data" => $result
    ]);
});

/**
 * @OA\Get(
 *      path="/reports/reciever/{reciever_id}",
 *      tags={"Reports"},
 *      summary="Get reports by reciever ID",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="reciever_id",
 *          in="path",
 *          required=true,
 *          description="ID of the reciever",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Reports successfully retrieved"
 *       )
 * )
 */
Flight::route("GET /reports/reciever/@reciever_id", function ($reciever_id) {
    Flight::json(Flight::reports_service()->get_report_by_reciever_id($reciever_id));
});
