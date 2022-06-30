import Products from "../models/product.schema.js";

/**
 *@swagger
 *components:
 *  schemas:
 *   Products:
 *     type: object
 *     properties:
 *       name:
 *         type:string
 *         description:product name
 *       description:
 *         type:string
 *         description product description
 *       price:
 *         type:integer
 *         description: price of product
 *       stock:
 *         type:integer
 *         description: stock products
 *       required:
 *         -name
 *         -price
 *         -email
 */
class ProductController {
  constructor() {
    this.products = [];
  }
  /**
   * @swagger
   * /api/products:
   *  get:
   *    summary: get all products
   *    tags: [Product]
   *    responses:
   *      200:
   *      description: all products
   *      content:
   *        application/json:
   *        schema:
   *          type:array
   *          items:
   *            $ref: '#/components/schemas/Products'
   */
  getProducts = async (req, res) => {
    try {
      const keyword = req.query.keyword;
      if (keyword) {
        const productsFilteredArray = await this.getProductsByKeyword(keyword);
        return res.json(productsFilteredArray);
      }

      const arrayProducts = await Products.find();
      return res.json(arrayProducts);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
  /**
   * @swagger
   * /api/products/{keyword}:
   *  get:
   *    summary: get products by keyword
   *    tags: [User]
   *    parameters:
   *      - in: path
   *        name: keyword
   *    responses:
   *      200:
   *      description: all products by keyword
   *      content:
   *        application/json:
   *        schema:
   *          type:array
   *          items:
   *            $ref: '#/components/schemas/Products'
   */
  getProductsByKeyword = async (keyword) => {
    const arrayProducts = await Products.find({
      name: { $regex: `.*${keyword}` },
    });
    return arrayProducts;
  };
  /**
   * @swagger
   * /api/products/{id}:
   *  get:
   *    summary: get products by id
   *    tags: [User]
   *    parameters:
   *      - in: path
   *        name: id
   *    responses:
   *      200:
   *      description: all products by id
   *      content:
   *        application/json:
   *        schema:
   *          type:array
   *          items:
   *            $ref: '#/components/schemas/Products'
   */
  getProductById = async (req, res) => {
    const productId = req.params.product_id;
    try {
      const product = await Products.findById(productId);
      return res.json(product);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
  /**
   * @swagger
   * /api/products:
   *  post:
   *    summary:create new product
   *    tags: [Product]
   *    requestBody:
   *      required:true
   *      content:
   *        application/json:
   *          schema:
   *            type:object
   *            $ref: '#/components/schemas/Products'
   */
  createProduct = async (req, res) => {
    let productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    };

    try {
      const newProduct = await Products.create(productData);
      return res.json(newProduct);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
  /**
   * @swagger
   * /api/users/{id}:
   *  put:
   *    summary: update product
   *    tags: [Product]
   *    parameters:
   *      - in: path
   *        name: id
   *    requestBody:
   *        required:true
   *    responses:
   *      200:
   *      description: update the product by id
   *      content:
   *        application/json:
   *        schema:
   *          type:object
   *          items:
   *            $ref: '#/components/schemas/Products'
   */
  updateProduct = async (req, res) => {
    try {
      const productId = req.params.product_id;
      const updates = req.body;
      const product = await Products.findByIdAndUpdate(productId, updates);
      return res.send(product);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
  /**
   * @swagger
   * /api/users/{id}:
   *  delete:
   *    summary: delete product
   *    tags: [Product]
   *    parameters:
   *      - in: path
   *        name: id
   *    requestBody:
   *        required:true
   *    responses:
   *      200:
   *      description: delete the product by id
   *      content:
   *        application/json:
   *        schema:
   *          type:object
   *          items:
   *            $ref: '#/components/schemas/Products'
   */
  deleteProduct = async (req, res) => {
    const productId = req.params.product_id;
    try {
      const product = await Products.findById(productId);
      await product.remove();
      return res.send({ success: true });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
}

export default new ProductController();
