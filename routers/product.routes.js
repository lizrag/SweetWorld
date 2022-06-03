import { Router } from "express";
import ProductController from "../controllers/product.controller.js";


const productRoutes = Router();

productRoutes.get('/products', getProducts);
productRoutes.get('/products/:product_id', getProductsId);
productRoutes.get('products?keyword=something', getProductKeyword);



export default productRoutes;

