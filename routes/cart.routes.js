import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.get("/carts/:cart_id", cartController.getCartById);

cartRoutes.post("/:id_carts/product", cartController.addProductToCart);
cartRoutes.post("/carts/create", cartController.createCart);

cartRoutes.delete(  "/carts/:cart_id/product",cartController.deleteProductFromCart);

export default cartRoutes;
