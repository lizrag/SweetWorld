import jwt from "jsonwebtoken";
import Users from "../models/user.schema.js";

class AuthController {
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email, password });

      if (user) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        return res.json({
          expireIn: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
          token,
        });
      }

      return res.json({
        success: false,
        message: "Login failed. Invalid credential",
      });
    } catch {
      return res.json({
        success: false,
        message: "Something went wrong. Please, try again later.",
      });
    }
  };
}

export default new AuthController();
