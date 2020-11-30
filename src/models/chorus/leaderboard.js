const mongoose = require("mongoose");

const post_schema = new mongoose.Schema(
  {
    post: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ChorusPost"
        }
      ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("leaderboard", post_schema);
