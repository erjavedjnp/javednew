const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    
    name: String,
    lname: String,
    about: String,
    photo: String,
    age : Number,
   
    
    });
const reco = mongoose.model('recommendation2', Schema)

module.exports = reco