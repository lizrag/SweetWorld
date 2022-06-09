import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/cart/create", cartController.createCart);
cartRoutes.get("/carts/:cart_id", cartController.getCartById);
cartRoutes.post("/cart/:cart_id/product", cartController.addProductCart);
cartRoutes.delete("/carts/:cart_id/product", cartController.deleteProductCart);

export default cartRoutes;
