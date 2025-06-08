<?php


/**
 * @OA\Get(
 *      path="/users",
 *      tags={"Users"},
 *      summary="Get all users",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="A list of users",
 *           @OA\JsonContent(
 *               type="array",
 *               @OA\Items(
 *                   @OA\Property(property="id", type="integer", example=1),
 *                   @OA\Property(property="name", type="string", example="John Doe"),
 *                   @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *                   @OA\Property(property="password", type="string", example="password123"),
 *                   @OA\Property(property="role", type="string", example="user"),
 *                   @OA\Property(property="profile_picture", type="string", example="profile1.jpg"),
 *                   @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *               )
 *           )
 *       )
 * )
 */
Flight::route("GET /users", function () {
    Flight::auth_middleware()->authorizeRole('admin');
    Flight::json(Flight::users_service()->get_all());
});

/**
 * @OA\Get(
 *      path="/users/{id}",
 *      tags={"Users"},
 *      summary="Get a user by ID",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          @OA\Schema(type="integer", format="int64", example=1)
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="A user object",
 *          @OA\JsonContent(
 *              type="object",
 *              @OA\Property(property="id", type="integer", example=1),
 *              @OA\Property(property="name", type="string", example="John Doe"),
 *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *              @OA\Property(property="password", type="string", example="password123"),
 *              @OA\Property(property="role", type="string", example="user"),
 *              @OA\Property(property="profile_picture", type="string", example="profile1.jpg"),
 *              @OA\Property(property="created_at", type="string", format="date-time", example="2025-03-24 16:05:43")
 *          )
 *      )
 * )
 */
Flight::route("GET /users/@id", function ($id) {
    Flight::auth_middleware()->authorizeRole('admin');
    Flight::json(Flight::users_service()->get_by_id($id, "id"));
});

/**
 * @OA\Post(
 *      path="/users",
 *      tags={"Users"},
 *      summary="Create a new user",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              required={"name", "email", "password", "role"},
 *              @OA\Property(property="name", type="string", example="John Doe"),
 *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *              @OA\Property(property="password", type="string", example="password123"),
 *              @OA\Property(property="role", type="string", example="user"),
 *              @OA\Property(property="profile_picture", type="string", example="profile1.jpg")
 *          )
 *      ),
 *      @OA\Response(
 *           response=201,
 *           description="User successfully created",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="message", type="string", example="User successfully created"),
 *               @OA\Property(property="user_id", type="integer", example=1)
 *           )
 *       )
 * )
 */
Flight::route("POST /users", function () {
    Flight::auth_middleware()->authorizeRole('admin');
    $request = Flight::request()->data->getData();
    Flight::json(Flight::users_service()->add($request));
});

/**
 * @OA\Delete(
 *      path="/users/{id}",
 *      tags={"Users"},
 *      summary="Delete a user",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the user to delete",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="User successfully deleted",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="message", type="string", example="User successfully deleted")
 *           )
 *       )
 * )
 */
Flight::route("DELETE /users/@id", function ($id) {
    Flight::auth_middleware()->authorizeRole('admin');
    Flight::json(Flight::users_service()->delete($id, "id"));
});

/**
 * @OA\Put(
 *      path="/users/{id}",
 *      tags={"Users"},
 *      summary="Update a user",
 *      security={
 *          {"ApiKey": {}}
 *      },
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          required=true,
 *          description="ID of the user to update",
 *          @OA\Schema(type="integer", example=1)
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          @OA\JsonContent(
 *              @OA\Property(property="name", type="string", example="John Doe"),
 *              @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *              @OA\Property(property="password", type="string", example="newpassword123"),
 *              @OA\Property(property="role", type="string", example="admin"),
 *              @OA\Property(property="profile_picture", type="string", example="profile2.jpg")
 *          )
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="User successfully updated",
 *           @OA\JsonContent(
 *               type="object",
 *               @OA\Property(property="message", type="string", example="User successfully updated")
 *           )
 *       )
 * )
 */
Flight::route("PUT /users/@id", function ($id) {
    Flight::auth_middleware()->authorizeRole('admin');
    $request = Flight::request()->data->getData();
    Flight::json(Flight::users_service()->update($request, $id, "id"));
});
