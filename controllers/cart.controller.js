import Carts from "../models/cart.schema.js";

class CartController {
  getCartById = async (req, res) => {
    let cartId = req.params.cart_id;
    try {
      const cart = await Carts.findOne({ _id: cartId });
      return res.json(cart);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

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
    console.log(cart);

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
                quantity: productInCart.quantity - quantity,
              },
            },
          }
        );
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
