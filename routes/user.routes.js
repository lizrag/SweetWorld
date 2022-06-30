import { Router } from "express";
import userController from "../controllers/user.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import validateCreate from "../validators/user.validator.js";

const userRoutes = Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: get all users
 *    tags: [User]
 *    responses:
 *      200:
 *      description: all users
 *      content: 
 *        application/json:
 *        schema:
 *          type:array
 *          items:
 *            $ref: '#/components/schemas/Users'
 */
userRoutes.get("/users", userController.getUsers);

userRoutes.post("/users/create", validateCreate, userController.createUser);

// For frontend users
userRoutes.get("/users/me", userController.getUserProfile);
userRoutes.put("/users/me", userController.updateUserProfile);

// For admin users
userRoutes.get("/users/:user_id/carts", userController.getCartsByUserId);
userRoutes.put("/users/:user_id", adminMiddleware, userController.updateUser);

export default userRoutes;
