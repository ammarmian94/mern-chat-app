const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chats", (req, res) => {
  console.log(chats);
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  //   console.log(singleChat);
  res.send(singleChat);
});

const port = process.env.PORT || 5000;
app.listen(5000, console.log(`Server is listening on port ${port}`));
