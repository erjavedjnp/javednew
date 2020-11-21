const mongoose = require('mongoose')


const featuredproductsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number
     },
  img:{
    type:String
  },
  link:{
      type:String
  },
  isfeatured:{
    type:Boolean,
    default:false,
  }
} ,{collection:'Featuredproducts'})




module.exports = mongoose.model('Featuredproducts', featuredproductsSchema)