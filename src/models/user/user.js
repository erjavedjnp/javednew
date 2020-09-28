const mongoose = require("mongoose")
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	firstname:{
		type:String,
		required:true,
		trim:true
	},
	lastname:{
		type:String,
		required:true,
		trim:true
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
	phoneno:{
		type:String,
		required:true,
		unique:true,
		validate(value){
			if(!value.length==10){
				throw new Error('phn no not valid!!')
			}
		}
	},
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	isVendor: Boolean,
	isAdmin:Boolean,
	mailverified:{
		type:Boolean,
		default:false
	}
});

userSchema.methods.generatingauthtoken=async function(){
	const user=this
	const token=jwt.sign({_id:user._id.toString()},'thisismyjwtsecret')
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
