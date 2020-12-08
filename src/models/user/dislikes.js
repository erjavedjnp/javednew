const mongoose = require("mongoose");

const Likes_schema = new mongoose.Schema({
  dislike: {
    type: mongoose.Schema.Types.ObjectId
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: "Post is Required Field"
  }
});

module.exports = mongoose.model("dislikes", Likes_schema);
