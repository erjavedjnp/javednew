const mongoose = require("mongoose");

const post_schema = new mongoose.Schema(
  {
      likes :{type: Number},
      dislikes :{type: Number},
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: "Comment is Required"
      }
    ],
    user: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ,
      video: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mux",
          required: "streamed video id is Required"
        }
      ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ChorusPost", post_schema);
