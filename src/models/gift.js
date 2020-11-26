const mongoose = require('mongoose');

const giftSchema = mongoose.Schema({
    senderid : {
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    receiverid : {
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    productid : {
        type:mongoose.Schema.ObjectId,
        ref:"Featuredproducts"
    },
    address : {
        type:String,
    }
});

module.exports = mongoose.model('Gift',giftSchema);