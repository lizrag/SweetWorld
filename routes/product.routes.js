import { Router } from "express";
import productController from "../controllers/product.controller.js";

const productRoutes = Router();

/**
 *@swagger
 *components:
 *  schemas:
 *   Products:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: product name
 *       description:
 *         type: string
 *         description: product description
 *       price:
 *         type: integer
 *         description: price of product
 *       stock:
 *         type: integer
 *         description: stock products
 *       required:
 *         - name
 *         - price
 *         - email
 */

/**
  * @swagger
  * /api/products:
  *  get:
  *    summary: get all users
  *    tags: [Product]
  *    requestBody:
  *      required: false
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            $ref: '#/components/schemas/Products'
  *    responses:
  *         200:
  *           description: all products!
  */
productRoutes.get("/products", productController.getProducts);

/**
  * @swagger
  * /api/products/create:
  *  post:
  *    summary: create a new product
  *    tags: [Product]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            $ref: '#/components/schemas/Products'
  *    responses:
  *         200:
  *           description: new product created!
  */
productRoutes.post("/products/create", productController.createProduct);

/**
  * @swagger
  * /api/products/{id}:
  *  get:
  *    summary: get product by id
  *    tags: [Product]
  *    parameters:
  *      - in: param
  *        name: cart_id
  *        required: true
  *    requestBody:
  *        required: false
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              $ref: '#/components/schemas/Users'
  *    responses:
  *      200:
  *         description: Product by id
  */
productRoutes.get("/products/:product_id", productController.getProductById);

/**
  * @swagger
  * /api/products/{product_id}:
  *  patch:
  *    summary: update product data
  *    tags: [User]
  *    parameters:
  *      - in: param
  *        name: cart_id
  *        required: true
  *    requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              $ref: '#/components/schemas/Products'
  *    responses:
  *      200:
  *         description: the product data was updated
  */
productRoutes.patch("/products/:product_id", productController.updateProduct);

/**
  * @swagger
  * /api/products/{id}:
  *  delete:
  *    summary: delete product
  *    tags: [Product]
  *    parameters:
  *      - in: param
  *        name: cart_id
  *        required: true
  *    requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              $ref: '#/components/schemas/Products'
  *    responses:
  *      200:
  *         description: the product was deleted
  */
productRoutes.delete("/products/:product_id", productController.deleteProduct);

export default productRoutes;