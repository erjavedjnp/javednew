const mongoose = require('mongoose')


const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
     },
  originalprice:{
       type:Number
     },
     stock: {
      type: String
    },
    detail: {
      type: String
    },
    brand:{
      type:String
    },
    supplier:{
      type:String
    },
    
  imgurl:{
    type:String
  }
} ,{collection:'Categories'})




module.exports = mongoose.model('Categories', categoriesSchema)