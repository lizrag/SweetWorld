const adminMiddleware = (req, res, next) => {
  try {
    const { role } = req.locals.user;

    if (role !== "admin") {
      throw new Error(
        "You are not authorized to request this resource. Please, contact to the JEFA"
      );
    }

    return next();
  } catch (error) {
    return res.json(401, {
      success: false,
      message: error.message,
    });
  }
};

export default adminMiddleware;
