import Chat from "../models/Chat.js";
import User from "../models/User.js";

// create or access chat with selected user
export const accessChats = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  // console.log(isChat);
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });

  // console.log("before if");
  if (isChat.length > 0) {
    // console.log("Chat Found");
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      // console.log("New Chat Created");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(404).json(error.message);
    }
  }
};

// fetch chat of single user
export const fetchChats = async (req, res) => {
  console.log("Fetch Chats");
  // console.log(req.body);
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name image email",
        });
        console.log(results);
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// create group chat with atleast 2 members and logged in user as admin
export const createGroupChat = async (req, res) => {
  if (!req.body.name || !req.body.users) {
    return res.status(400).json("Please fill all fields");
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 0) {
    return response
      .status(400)
      .json("More than two group members are required to form a group chat");
  }

  try {
    const newGroupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: newGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const renameGroupChat = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(400).jaon("No Chat Found");
  } else {
    res.json(updatedChat);
  }
};

export const addToGroup = async (req, res) => {
  const { userId, chatId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400).json("No Chat Found");
  } else {
    res.json(added);
  }
};

export const removeFromGroup = async (req, res) => {
  const { userId, chatId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(400).json("No Chat Found");
  } else {
    res.json(removed);
  }
};
