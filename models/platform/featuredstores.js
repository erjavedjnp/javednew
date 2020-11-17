const mongoose = require('mongoose')


const featuredstoresSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
 
  price: {
    type: Number
     },
 
  imgurl:{
    type:String
  },
  link:{
      type:String
  }
} ,{collection:'Featuredstores'})




module.exports = mongoose.model('Featuredstores', featuredstoresSchema)