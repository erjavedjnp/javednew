var mongoose = require("mongoose");
const validator =require('validator')
const uuidv1 = require("uuid/v1");
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
      unique: true
    },
    age:{
      type:Number,
      require:true

    },
    userinfo: {
      type: String,
      trim: true
    },
     status: {
      type: String,
      maxlength: 70,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    posts: [{
      type:mongoose.Schema.id
      ref:"Posts" 
    }]
  },
    followers: [{
      type:mongoose.Schema.id
      ref:"Followers" 
    }]
  ,
  
  inbox: [{
      type:mongoose.Schema.id
      ref:"Inbox" 
    }]
  ,
  notification: [{
      type:mongoose.Schema.ObjectId,
      ref:"Notification" 
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
  { timestamps: true }
);
module.exports = mongoose.model("User",userSchema);
