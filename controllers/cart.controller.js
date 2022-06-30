import Carts from "../models/cart.schema.js";

/**
 *@swagger
 *components:
 *  schemas:
 *   Carts:
 *     type: object
 *     properties:
 *       status:
 *         type:boolean
 *         description:current status active or not
 *       total:
 *         type:number
 *         description total of the cart
 *       created_at:
 *         type:string
 *         description: date of creation
 *       user_id:
 *         type:string
 *         description: user id
 *       product_id:
 *         type:string
 *         description:product id
 *       quantity:
 *         type:number
 *         description: quantity of items
 *       required:
 *         -user_id
 */
class CartController {
  /**
   * @swagger
   * /api/carts/{id}:
   *  get:
   *    summary: get carts by id
   *    tags: [Cart]
   *    parameters:
   *      - in: path
   *        name: id
   *    responses:
   *      200:
   *      description: all carts by id
   *      content:
   *        application/json:
   *        schema:
   *          type:array
   *          items:
   *            $ref: '#/components/schemas/Carts'
   */
  getCartById = async (req, res) => {
    let cartId = req.params.cart_id;
    try {
      const cart = await Carts.findOne({ _id: cartId });
      return res.json(cart);
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
  createCart = async (req, res) => {
    const user_id = req.locals.user._id;

    try {
      const { _id } = await Carts.create({ user_id });

      return res.json({
        cart_id: _id,
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

  addProductToCart = async (req, res) => {
    const cartId = req.params.cart_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity ? Number.parseInt(req.body.quantity) : 1;

    const cart = await Carts.findById(cartId);

    const productInCart = cart.products.find(
      (product) => product.product_id == product_id
    );

    try {
      if (productInCart) {
        const productIndex = cart.products.findIndex(
          (product) => product.product_id == product_id
        );
        await Carts.updateOne(
          { _id: cartId },
          {
            $set: {
              [`products.${productIndex}`]: {
                product_id,
                quantity: productInCart.quantity + quantity,
              },
            },
          }
        );
      } else {
        await Carts.updateOne(
          { _id: cartId },
          {
            $addToSet: {
              products: {
                product_id,
                quantity,
              },
            },
          }
        );
      }

      const cartUpdated = await Carts.findById(cartId);
      cartUpdated.getTotal();
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }

    return res.json({
      success: true,
      message: `Product ${product_id} added successfully to cart ${cartId}`,
    });
  };

  deleteProductFromCart = async (req, res) => {
    const cartId = req.params.cart_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity ? Number.parseInt(req.body.quantity) : 1; // If not set, delete one

    const cart = await Carts.findById(cartId);

    const productInCart = cart.products.find(
      (product) => product.product_id == product_id
    );

    try {
      if (productInCart) {
        const productIndex = cart.products.findIndex(
          (product) => product.product_id == product_id
        );

        if (productInCart.quantity - quantity <= 0) {
          await Carts.updateOne(
            { _id: cartId },
            {
              $pull: {
                products: { $in: [{ ...productInCart }] },
              },
            }
          );
        } else {
          await Carts.updateOne(
            { _id: cartId },
            {
              $set: {
                [`products.${productIndex}`]: {
                  product_id,
                  quantity: productInCart.quantity - quantity,
                },
              },
            }
          );
        }

        const cartUpdated = await Carts.findById(cartId);
        cartUpdated.getTotal();
      }
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }

    return res.json({
      success: true,
      message: `Product ${product_id} deleted successfully from cart ${cartId}`,
    });
  };
}

export default new CartController();
