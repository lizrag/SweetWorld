import Users from "../models/user.schema.js";
import Carts from "../models/cart.schema.js";

/** 
*@swagger
*components:
*  schemas:
*   Users:
*     type: object
*     properties:
*       name:
*         type:string
*         description:user name
*       last_name:
*         type:string
*         description user last name
*       email:
*         type:string
*         description: user email
*       password:
*         type:string
*         description: user password
*       address:
*         type:string
*         description:user address
*       rol:
*         type:string
*         description: customer
*       required:
*         -name
*         -last_name
*         -email
*         -password
*         -address
*/

class UserController {
  constructor() {
    this.users = [];
  }
/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: get all users
 *    tags: [User]
 *    responses:
 *      200:
 *      description: all users
 *      content: 
 *        application/json:
 *        schema:
 *          type:array
 *          items:
 *            $ref: '#/components/schemas/Users'
 */
  getUsers = async (req, res) => {
    try {
      const arrayUsers = await Users.find();
      return res.json(arrayUsers);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: get carts by user id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *      200:
 *      description: all carts related to an user
 *      content: 
 *        application/json:
 *        schema:
 *          type:array
 *          items:
 *            $ref: '#/components/schemas/Users'
 */
  getCartsByUserId = async (req, res) => {
    try {
      const userCarts = await Carts.find({ user_id: req.params.user_id });
      return res.json(userCarts);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
/**
 * @swagger
 * /api/users:
 *  post:
 *    summary:create a new user
 *    tags: [User]
 *    requestBody:
 *      required:true
 *      content: 
 *        application/json:
 *          schema:
 *            type:object
 *            $ref: '#/components/schemas/Users'
 */
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

  /**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: update user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *        required:true
 *        content: 
 *          application/json:
 *            schema:
 *              type:object
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *      description: update the user with id
 *      content: 
 *        application/json:
 *        schema:
 *          type:array
 *          items:
 *            $ref: '#/components/schemas/User'
 */
  // This method is used by an admin user to update other users data
  updateUser = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const update = req.body;
      const userUpdated = await Users.findByIdAndUpdate(userId, update);

      if (!userUpdated) {
        throw Error("User not found. Check :user_id param");
      }

      return res.json(userUpdated);
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
/**
 * @swagger
 * /api/users/:
 *  get:
 *    summary: get user profile
 *    tags: [User]
 *    responses:
 *      200:
 *      description: get your user profile
 *      content: 
 *        application/json:
 *        schema:
 *          type:string
 *          items:
 *            $ref: '#/components/schemas/Users'
 */
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
/**
 * @swagger
 * /api/users/:
 *  put:
 *    summary: update user profile
 *    tags: [User]
 *    parameters:
 *      - in: query
 *        name: id
 *    requestBody:
 *        required:true
 *        content: 
 *          application/json:
 *            schema:
 *              type:object
 *              $ref: '#/components/schemas/Users'
 *    responses:
 *      200:
 *      description: update the user profile
 *      content: 
 *        application/json:
 */
  updateUserProfile = async (req, res) => {
    const userId = req.locals.user._id;
    const { name, last_name, email, password, password_confirmation, address } =
      req.body;

    if (password !== password_confirmation) {
      return res.json({
        success: false,
        message: "Password and password_confirmation inputs must be equals",
      });
    }

    try {
      await Users.findByIdAndUpdate(userId, {
        name,
        last_name,
        email,
        password,
        address,
      });
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
