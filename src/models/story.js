var mongoose = require('mongoose')
const router = require('../routes/comfort-zone')

var storyschema = mongoose.Schema({
    contentlink : {
        type : String
    },
    timestamp : {
        type : String
    },

})

module.exports = mongoose.model('Story',storyschema)