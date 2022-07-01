import { Router } from "express";
import userController from "../controllers/user.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import validateCreate from "../validators/user.validator.js";

const userRoutes = Router();
/**
 *@swagger
 *components:
 *  schemas:
 *   Users:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: user name
 *       last_name:
 *         type: string
 *         description: user last name
 *       email:
 *         type: string
 *         description: user email
 *       password:
 *         type: string
 *         description: user password
 *       address:
 *         type: string
 *         description: user address
 *       rol:
 *         type: string
 *         description: customer
 *       required:
 *         - name
 *         - last_name
 *         - email
 *         - password
 *         - address
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: get all users
 *    tags: [User]
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *         200:
 *           description: all users!
 */
userRoutes.get("/users", userController.getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *         200:
 *           description: new user created!
 */
userRoutes.post("/users/create", validateCreate, userController.createUser);

/**
 * @swagger
 * /api/users/me:
 *  get:
 *    summary: get my user profile
 *    tags: [User]
 *    parameters:
 *      - in: param
 *        name: user_id
 *        required: true
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *         200:
 *           description: user profile
 */
userRoutes.get("/users/me", userController.getUserProfile);

/**
 * @swagger
 * /api/users/me:
 *  put:
 *    summary: admin update user profile
 *    tags: [User]
 *    parameters:
 *      - in: param
 *        name: user_id
 *        required: true
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *         description: the user profile was updated
 */
userRoutes.put("/users/me", userController.updateUserProfile);

/**
 * @swagger
 * /api/users/{user_id}/carts:
 *  get:
 *    summary: get all carts related to an user id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *         description: carts of this user
 */
userRoutes.get("/users/:user_id/carts", userController.getCartsByUserId);

/**
 * @swagger
 * /api/{user_id}:
 *  put:
 *    summary: update user profile
 *    tags: [User]
 *    parameters:
 *      - in: param
 *        name: user_id
 *        required: true
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *         description: your user profile was updated
 */
userRoutes.put("/users/:user_id", adminMiddleware, userController.updateUser);

export default userRoutes;
