const express = require("express");
const mongoose = require("mongoose");
const app = express();
const httpServer = require("http").createServer(app);
require("dotenv").config();
const user = require("./routes/user");
const post = require("./routes/post");
const comment = require("./routes/comment");
const friend = require("./routes/friend");

const PORT = process.env.PORT || 3000;

app.use(express.json());

//mongoose connect
mongoose
  .connect(process.env.STRING_CONNECT_DB, {})
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));

app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment);
app.use("/friend", friend);

httpServer.listen(PORT, () => {
  console.log("run in 3000");
});
