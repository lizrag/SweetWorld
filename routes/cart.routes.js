import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const cartRoutes = Router();
/**
 *@swagger
 *components:
 *  schemas:
 *   Carts:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         description: active or innactive
 *       total:
 *         type: interger
 *         description: total of the cart
 *       created_at:
 *         type: string
 *         description: date created
 *       user_id:
 *         type: objetc
 *         description: the id of the user
 *       required:
 *         - user_id
 */

/**
  * @swagger
  * /api/carts/{cart_id}:
  *  get:
  *    summary: get cart by id
  *    tags: [Cart]
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
  *              $ref: '#/components/schemas/Carts'
  *    responses:
  *      200:
  *         description: Cart by id
  */
cartRoutes.get("/carts/:cart_id", cartController.getCartById);

/**
  * @swagger
  * /api/{cart_id}/product:
  *  post:
  *    summary: add product to cart
  *    tags: [Cart]
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
  *         description: Add products to the cart
  */
cartRoutes.post("/carts/:cart_id/product", cartController.addProductToCart);

/**
  * @swagger
  * /api/carts/create:
  *  post:
  *    summary: create a new cart
  *    tags: [Cart]
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            type: object
  *            $ref: '#/components/schemas/Carts'
  *    responses:
  *         200:
  *           description: new cart created!
  */
cartRoutes.post("/carts/create", cartController.createCart);

/**
  * @swagger
  * /api/carts/{cart_id}/product:
  *  delete:
  *    summary: delete product from cart
  *    tags: [Cart]
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
  *              $ref: '#/components/schemas/Carts'
  *    responses:
  *      200:
  *         description: the product was deleted
  */
cartRoutes.delete( "/carts/:cart_id/product",cartController.deleteProductFromCart);

export default cartRoutes;