var mongoose = require("mongoose");
const validator =require('validator')
// const uuidv1 = require("uuid/v1");
const jwt=require('jsonwebtoken')

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email not valid');
    }},
    password:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(value.length<6){
        throw new Error()
      }
    }
  },
    age:{
      type:Number,
      required:true

    },
    avatar,
    userinfo: {
      type: String,
      trim: true
    },
     status: {
      type: String,
      maxlength: 70,
      trim: true
    },
    posts: [{
      type:mongoose.Schema.ObjectId,
      ref:"Posts" 
    }]
  },
    followers: [{
      type:mongoose.Schema.ObjectId,
      ref:"User" 
    }]
  ,
  following: [{
      type:mongoose.Schema.ObjectId,
      ref:"User" 
    }]
  ,
  inbox: [{
      type:mongoose.Schema.ObjectId,
      ref:"Inbox" 
    }]
  ,
  notification: [{
      type:mongoose.Schema.ObjectId,
      ref:"Notifications" 
    }]
  ,
  story: [{
      type:mongoose.Schema.ObjectId,
      ref:"Story" 
    }]
  ,
  messages: [{
      type:mongoose.Schema.ObjectId,
      ref:"Messages" 
    }]
  ,
  istopleader: {
      type:Boolean
      
    }
  ,
  
  mytop8: [{
      type:mongoose.Schema.ObjectId,
      ref:"User" 
    }]
  ,
  dating: {
      type:mongoose.Schema.ObjectId,
      ref:"Dating" 
    }
  ,
  comments: {
      type:mongoose.Schema.ObjectId,
      ref:"Comment" 
    }
  ,
 

  createdAt:{
    type:Number,
    default:new Date().getTime()

  }
}
);
module.exports = mongoose.model("User",userSchema);