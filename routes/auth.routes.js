import { Router } from "express";
import AuthController from "..controllers/auth.controller.js" ;

const authRoutes = Router();

authRoutes.post("/auth/login", AuthController.login);
authRoutes.post("/auth/logout", AuthController.logout);

export default authRoutes;
