const express = require("express");
const mongoose = require("mongoose");
const app = express();
const httpServer = require("http").createServer(app);
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//mongoose connect
mongoose
  .connect(process.env.STRING_CONNECT_DB, {})
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));

const user = require("./routes/user");
app.use("/user", user);

httpServer.listen(PORT, () => {
  console.log("run in 3000");
});
