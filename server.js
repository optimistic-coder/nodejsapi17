const express = require("express");
const app = express();
const posts = require("./routes/posts");
const user = require("./routes/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(db)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/routes/post", posts);
app.use("/routes/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running..."));
