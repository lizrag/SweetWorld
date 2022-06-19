import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRoutes = Router();

productRoutes.get("/products", productController.getProducts);
productRoutes.get("/products/:product_id", productController.getProductById);
productRoutes.get("/products/:keyword", productController.getProductsByKeyword);

productRoutes.post("/products/create", productController.createProduct);

productRoutes.post("/products/:product_id ", productController.deleteProduct);

export default productRoutes;
