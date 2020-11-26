const mongoose = require("mongoose")
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema = new mongoose.Schema({
	fullname:{
		type:String,
		required:true,
		trim:true
	},
	username:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	biography:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email not valid')
			}
		}
	},
	age:{
		type:Number,
		required:true
	},
	password:{
		type:String,
		required:true,
		trim:true,
		validate(value){
			if(value.length<6){
				throw new Error()
			}
		}
	},
	img: 
    { 
        data: Buffer, 
        contentType: String 
    } ,
	avatar:{
		type:String
	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	mytop8: [{
		type:mongoose.Schema.ObjectId,
		ref:"User" 
	  }],
	  notification: [{
		type:mongoose.Schema.ObjectId,
		ref:"Notifications" 
	  }],
	  posts: [{
		type:mongoose.Schema.ObjectId,
		ref:"Posts" 
	  }],
	  story : [{
		  type:mongoose.Schema.ObjectId,
		  ref:"Story"
	  }],
	mailverified:{
		type:Boolean,
		default:false
	},
	gender:{
		type:String,
	},
	country:{
		type:String,
	},
	isAdmin:Boolean,
});

userSchema.methods.generatingauthtoken=async function(){
	const user=this
	const token=jwt.sign({_id:user._id.toString()},'thisismyjwtsecret2')
	user.tokens=user.tokens.concat({token})
    await user.save()
	return token
}

userSchema.pre('save',async function(next){
	const user=this
	if(user.isModified('password')){
		user.password=await bcrypt.hash(user.password,8)
	}
	next()
})

module.exports = mongoose.model("User",userSchema);
