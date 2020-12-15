const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
var UserpersonalmessageSchema = Schema({
    senderid : String,
    message : {type : String,  trim:true}, 
    messagetype:{type:Number, default:1}
});

module.exports = mongoose.model('Userpersonalmessage', UserpersonalmessageSchema); 