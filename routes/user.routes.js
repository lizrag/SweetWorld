import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/users", userController.getUsers);
userRoutes.get("/users/:user_id/carts", userController.getCartsByUserId);

userRoutes.post("/users/create", userController.createUser);

userRoutes.put("/users/:user_id", userController.updateUser);

export default userRoutes;
