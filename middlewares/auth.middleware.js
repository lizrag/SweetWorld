import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch {
    return res.json(401, {
      success: false,
      message: "Your authorization token is not valid. Double-check if the token has not expired yet or please, try again",
    });
  }
};

export default authMiddleware;
