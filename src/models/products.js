const mongoose = require('mongoose')


const productsSchema = new mongoose.Schema({
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
    new:{
      type:Boolean
    },
    popular:{
      type:Boolean
    },
   
  imgurl:{
    type:String
  }
} ,{collection:'Products'})




module.exports = mongoose.model('Products', productsSchema)