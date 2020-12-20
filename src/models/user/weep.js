const mongoose = require("mongoose");

const Likes_schema = new mongoose.Schema({
  weep: {
    type: mongoose.Schema.Types.ObjectId
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: "Post is Required Field"
  }
});

module.exports = mongoose.model("weep", Likes_schema);
