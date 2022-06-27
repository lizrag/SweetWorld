import Carts from "../models/cart.schema.js";
import Users from "../models/user.schema.js";

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
    let { user_id, total, cart_products } = req.body;
  
    try{
      const cartCreated= await Carts.create({user_id, total, cart_products});
      return res.json(cartCreated);
    }catch(error){
      return res.json({success: false, message: error});
    }

    /*try {
      const cartCreated = await Users.find().populate({
        path:"carts.product_id",
        select:"product_id, total"
      });
      return cartCreated[0];
    } catch (error) {
      return res.json({ success: false, message: error });
    }*/
  };

  addProductToCart = async (req, res) => {
    const cartId = req.body.cart_id;
    const productSelected = req.body.product_id;
    const quantity = Number.parseInt(req.body.quantity);
    try {
      let cartInfo = await Carts.findOne({ _id: cartId });
      console.log(cartInfo)
      let productModification = {products_id: productSelected, quantity:quantity}
      const addProductCart= await Carts.updateOne({_id:cartId}, {$addToSet:{cart_products:productModification}})
      
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
