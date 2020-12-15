const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const UserpersonalSchema = Schema({
    userid1: String,
    userid2: String,  
    userpersonalmessages: [{ type: Schema.Types.ObjectId, ref: 'Userpersonalmessage' }]
});
 
module.exports = mongoose.model('Userpersonal', UserpersonalSchema); 