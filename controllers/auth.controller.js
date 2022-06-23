import jwt from "jsonwebtoken";

class AuthController {
  login = async (req,res)=>{
    const user = await user.findOne({email, password});

    if(user){
      const token = jwt.sign(user.toJson(), process.env.JWT_SECRET, {
        expiresIn:"24h"
      });
      return res.json({
        expireIn: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
        token,
      })
    }
    return res.json({
      success:false,
      message: "Login failed. Invalid credential"
    })
  }
};

export default new AuthController();
