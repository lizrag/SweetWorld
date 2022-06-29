import { Router } from "express";
import userController from "../controllers/user.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);

userRoutes.post("/users/create", userController.createUser);

// For frontend users
userRoutes.get("/users/me", userController.getUserProfile);
userRoutes.put("/users/me", userController.updateUserProfile);

// For admin users
userRoutes.get("/users/:user_id/carts", userController.getCartsByUserId);
userRoutes.put("/users/:user_id", adminMiddleware, userController.updateUser);

export default userRoutes;