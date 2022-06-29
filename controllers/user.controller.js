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
    let { name, last_name, email, password, password_confirmation, address } =
      req.body;

    if (password !== password_confirmation) {
      return res.json({
        success: false,
        message: "Password and password_confirmation inputs must be equals",
      });
    }

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

  // This method is used by an admin user to update other users data
  updateUser = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const update = req.body;
      const userUpdated = await Users.findByIdAndUpdate(userId, update);
      return res.send(userUpdated);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };

  getUserProfile = async (req, res) => {
    const userId = req.locals.user._id;
    try {
      const userData = await Users.findById(userId);
      return res.json(userData);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  };

  updateUserProfile = async (req, res) => {
    const userId = req.locals.user._id;
    const data = req.body;
    try {
      await Users.findByIdAndUpdate(userId, data);
      return res.json({
        success: true,
        message: "Your profile has been updated sucessfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default new UserController();
