import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRoutes = Router();

/**
  * @swagger
  * /api/auth/login:
  *  post:
  *    summary: login 
  *    tags: [Auth]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            description: JSON with email and password 
  *    responses:
  *         200:
  *           description: login sucessfully!
  */
authRoutes.post("/auth/login", AuthController.login);

export default authRoutes;
