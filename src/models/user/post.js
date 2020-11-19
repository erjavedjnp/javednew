const mongoose=require('mongoose')


const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    location:{
        type:String
    },
    avatar:{
        type:String
    },
    text:{
        type:String
    },
    likes:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }],
    comment:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Post",postSchema);