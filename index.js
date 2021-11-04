const express = require("express");
const mongoose = require("mongoose");
const app = express();
const httpServer = require("http").createServer(app);
require("dotenv").config();
const user = require("./routes/user");
const post = require("./routes/post");
const comment = require("./routes/comment");
const friend = require("./routes/friend");
const media = require("./routes/media");
var cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(express.json());

//cors

var corsOptions = {
  origin: "https://mt-social-media-app-client.herokuapp.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//static file

app.use("/media", express.static("upload/photo"));

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
app.use("/media", media);

httpServer.listen(PORT, () => {
  console.log("run in 3000");
});
