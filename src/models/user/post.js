const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  image: [],
  
  
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    avatar: String
  },
  tags: [],
  timePosted: { type: Date, default: Date.now },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: "Comment is Required"
    }
  ]
},{collection: 'Post'});

module.exports = mongoose.model("Post", postSchema);
