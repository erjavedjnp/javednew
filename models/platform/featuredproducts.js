const mongoose = require('mongoose')


const featuredproductsSchema = new mongoose.Schema({
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
} ,{collection:'Featuredproducts'})




module.exports = mongoose.model('Featuredproducts', featuredproductsSchema)