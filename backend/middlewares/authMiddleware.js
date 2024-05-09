import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("password");
      next();
    } catch (error) {
      res.status(401).json("Not Authorized, token failed.!");
    }
  }

  if (!token) res.status(401).json("Not Authorized, no token.!");
};

export default Protect;
