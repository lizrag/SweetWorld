import Carts from "../models/cart.schema.js";
import Products from "../models/product.schema.js";
class CartController {
  constructor() {
    this.carts = [];
  }

  getCartById = async (req, res) => {
    let cartId = req.params.cart_id;
    try {
      const cart = await Carts.findById(cartId);
      return res.json(cart);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

  createCart = async (req, res) => {
    let { user_id: userId } = req.body;
    let cart = { userId };
    try {
      const cartCreated = await Carts.create(cart);
      return res.json(cartCreated);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

  addProductToCart = async (req, res) => {
    const cartId = req.params.cart_id;
    const productSelected = req.body.product_id;
    const quantity = Number.parseInt(req.body.quantity);
    try {
      let cartInfo = await Carts.findOne({ id: cartId });
      let productInfo = await Products.findById(productSelected);
      const addProductCart = new Carts({
        cartInfo,
        productInfo,
        quantity,
      });
      addProductCart.save();
      return res.json(addProductCart);
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error });
    }
  };

  deleteProductFromCart = async (req, res) => {
    const productID = req.params.product_id;
    const cart = req.params.cart_id;
    try {
      const cartSelected = await Carts.findById(cart);
      const deleteProduct = await cartSelected.findByIdAndRemove(productID);
      await deleteProduct.remove();
      return res.send({ success: true });
    } catch {
      return res.json({ success: false, message: error });
    }
  };
}

export default new CartController();
