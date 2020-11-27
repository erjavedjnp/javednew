const mongoose = require("mongoose");

const post_schema = new mongoose.Schema(
  {
    post: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ChorusPost"
        }
      ],
      leaderboard: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "leaderboard"
        }
      ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Chorus", post_schema);
