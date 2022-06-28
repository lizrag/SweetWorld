import Users from "../models/user.schema.js";
import Carts from "../models/cart.schema.js";

class UserController {
  constructor() {
    this.users = [];
  }

  getUsers = async (req, res) => {
    try {
      const arrayUsers = await Users.find();
      return res.json(arrayUsers);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

  getCartsByUserId = async (req, res) => {
    try {
      const userCarts = await Carts.find({ user_id: req.params.user_id });
      return res.json(userCarts);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

  createUser = async (req, res) => {
    let { name, last_name, email, password, address } = req.body;

    try {
      const newUser = await Users.create({
        name,
        last_name,
        email,
        password,
        address,
      });
      return res.json(newUser);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

  updateUser = async (req, res) => {
    const user_id = req.locals.user._id;
    try {
      const user = req.params.user_id;
      const update = req.body;
      const userUpdated = await Users.findByIdAndUpdate(user, user_id, update);
      return res.send(userUpdated);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
}

export default new UserController();
