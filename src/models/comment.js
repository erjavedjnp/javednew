var mongoose = require("mongoose");

var commentSchema = new  mongoose.Schema({
    comment :{type: String},
    
    createdAt:{type:Date, default:Date.now},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
    

});

module.exports=mongoose.model("Comment",commentSchema);