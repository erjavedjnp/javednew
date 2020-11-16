const mongoose = require('mongoose')

var Schema = new mongoose.Schema({

    about: String
    
    });
const user = mongoose.model('Comment', Schema)

module.exports = user