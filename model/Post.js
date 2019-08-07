const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create moedels
const PostSchema = new Schema({
  name: {
    type: String
  },
  img: {
    type: String
  },
  prize: {
    type: Number
  },
  quantity: {
    type: Number
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
