import { Router } from "express";
import ProductController from "../controllers/product.controller.js";


const productRoutes = Router();

productRoutes.get('/products', getProduct);
productRoutes.get('/products/:product_id', getProductId);
productRoutes.get('products?keyword=something', getProductKeyword);

productRoutes.post('/products/create', createProduct);

productRoutes.delete('/products/:product_id', deleteProduct);




export default productRoutes;

