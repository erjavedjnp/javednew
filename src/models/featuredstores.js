const mongoose = require('mongoose')


const featuredstoresSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imgurl:{
    type:String
  },
  link:{
      type:String
  },
  isfeatured:{
    type:Boolean,
    default:false,
  }
} ,{collection:'Featuredstores'})




module.exports = mongoose.model('Featuredstores', featuredstoresSchema)