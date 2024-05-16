import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    if (!users) res.status(401).json("No user found");
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }

  // console.log(keyword);

  // try {
  //   const users = await User.find();
  //   if (!users) res.status(401).json("No user found");
  //   res.status(200).json(users);
  // } catch (error) {
  //   res.status(401).json(error);
  // }
};
