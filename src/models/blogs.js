const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    
    name: String,
    lname: String,
    about: String,
    photo: String,
    age : Number,
   
    
    });
const blogs = mongoose.model('blogs', Schema)

module.exports = blogs