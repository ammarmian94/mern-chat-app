import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    console.log("api called");
    const users = await User.findAll();
    if (!users) res.status(401).json("No user found");
    res.status(200).json(users);
  } catch (error) {
    console.log("catch");
    res.status(401).json(error);
  }
};
