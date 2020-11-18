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
      validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email not valid')
    },
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
    posts: [{
      type:mongoose.Schema.ObjectId
      ref:"Posts" 
    }]
  },
    followers: [{
      type:mongoose.Schema.ObjectId
      ref:"Followers" 
    }]
  ,
  following: [{
      type:mongoose.Schema.ObjectId
      ref:"Following" 
    }]
  ,
  inbox: [{
      type:mongoose.Schema.ObjectId
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
  topleader: {
      type:mongoose.Schema.ObjectId
      ref:"Topleader" 
    }
  ,
  corusmember: {
      type:mongoose.Schema.ObjectId
      ref:"Corusmember" 
    }
  ,
  coruspost: [{
      type:mongoose.Schema.ObjectId
      ref:"Coruspost" 
    }]
  ,
  mytop8: [{
      type:Boolean,
      ref:"mytop8" 
    }]
  ,
  dating: {
      type:mongoose.Schema.ObjectId
      ref:"Followers" 
    }
  ,
  comments: {
      type:mongoose.Schema.ObjectId
      ref:"Comments" 
    }
  ,
  notifications: {
      type:mongoose.Schema.ObjectId
      ref:"Notifications" 
    }
  ,

  { timestamps: true }
);
module.exports = mongoose.model("User",userSchema);
