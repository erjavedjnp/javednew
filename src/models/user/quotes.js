const mongoose = require('mongoose')

const quoteschema = new mongoose.Schema({
  userid: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  contenttype : {
    type:String
  },
  image :  {
    type : Buffer(encode_image, 'base64')
  }
})