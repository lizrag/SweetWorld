import { Router } from "express";
import login from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/auth", login);

export default authRoutes;