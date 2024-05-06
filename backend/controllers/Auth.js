import User from "../models/User.js";
import generateToken from "../utils/common.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json("catch " + error);
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      console.log(user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send("Invalid Username or Password");
    }
  } catch (error) {
    res.status(500).json("catch " + error);
  }
};
