import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.locals = { user };

    return next();
  } catch {
    return res.status(401).send( {
      success: false,
      message:
        "Your authorization token is not valid. Double-check if the token has not expired yet or please, try again",
    });
  }
};

export default authMiddleware;
