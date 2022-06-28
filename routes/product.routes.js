import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRoutes = Router();

productRoutes.get("/products", productController.getProducts);
productRoutes.post("/products/create", productController.createProduct);
productRoutes.get("/products/:product_id", productController.getProductById);
productRoutes.patch("/products/:product_id", productController.updateProduct);
productRoutes.delete("/products/:product_id", productController.deleteProduct);

export default productRoutes;