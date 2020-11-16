const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 
  price: {
    type: Number
     },
  originalprice:{
       type:Number
     },
     number: {
      type: Number
    },
 
    
  imgurl:{
    type:String
  }
} ,{collection:'Cart'})




module.exports = mongoose.model('Cart', cartSchema)