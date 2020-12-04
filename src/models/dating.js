const mongoose = require("mongoose");
 

const datingSchema = new mongoose.Schema({
    fullname : {
        type: String
    },
    username : {
        type: String
    },
    shotbio : {
        type: String
    },
    gender : {
      type: String
    },
    age:{
        type: Number
    },
    date: {
     type: Date
    },
    occupation: {
        type:String
    },
    country : {
        type: String
    },
    state: {
        type: String
    },
    height: {
        type: Number
    },
    fullbio:{
        type : String
    },
    userid : {
     type : mongoose.Schema.Types.ObjectId,
     ref: "User"
    },
    avatar : {
        type: String
    }, 
    likes :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dating"
        }
    ],
    dislike : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dating"
        } 
    ],
    allmatched : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dating"
        }
    ],
    score :{
        type: Number
    },
    genderpref : {
        type: String
    },
    location : {
        latitude: String,
        longitude: String
    }

    
})

module.exports = mongoose.model("Dating" , datingSchema)