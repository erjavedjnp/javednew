const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
 
  post: {
    type: Object 
  },
  user : {
    type: Object 
  }
});

module.exports = mongoose.model("Share", comment_schema);

