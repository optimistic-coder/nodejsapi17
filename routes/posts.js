const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");
router.get("/posts", (req, res) => {
  res.send("this is posts");
});
//createPost
router.post("/createPost", (req, res) => {
  const newPost = new Post({
    name: req.body.name,
    img: req.body.img,
    prize: req.body.prize,
    quantity: req.body.quantity
  });
  newPost.save().then(post => res.json(post));
});
//getPost
router.get("/allPost", (req, res) => {
  Post.find()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

module.exports = router;
