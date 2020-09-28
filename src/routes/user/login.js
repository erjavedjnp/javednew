const express = require("express");
const router = express.Router();
const User = require("../../models/user/user.js");
const auth=require('../../authentication/user/auth')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


router.get("/register",(req,res)=>{
	res.render("registration.ejs");
});


// router.get("/vender-register",(req,res)=>{
// 	res.render("venderregistration.ejs")
// })


router.get("/signin",(req,res)=>{
	res.render("signin.ejs")
})

// router.get("/forget-password",(req,res)=>{
// 	res.render("forgetpassword.ejs")
// })

// router.get("/reset-password",(req,res)=>{
// 	const token=req.query.token
// 	res.render("resetpassword.ejs",{token})
// })


// //<-------------->TO READ THE USER PROFILE<---------------->
// router.get('/profile',auth,async(req,res)=>{
// 	res.send(req.user)
// })


//<------------>TO LOGOUT THE USER<---------------->
router.get('/logout',auth,async(req,res)=>{
	try{
		req.user.tokens=req.user.tokens.filter((token)=>{
			return req.token!==token.token
		})
		await req.user.save()
		res.redirect('/')
	}catch(e){
		res.redirect('/')
	}
})




//======================================
//
//				POST ROUTES   (CHANGES WITH DATABASE AND AUTHORIZATION)
//
//======================================


router.post("/register",async(req,res)=>{ 
	try{
        const user=new User(req.body)
        const token=await user.generatingauthtoken()
		res.cookie('auth_token',token)
		const userproduct=new Userproduct({})
		await userproduct.save()
		user.products=userproduct._id
        await user.save()
        res.send('register sucessfully')
	}catch(e){
		res.send(e)
	}
});




//   CORRECT IT!!!!!!!!
router.post('/signin',async (req,res)=>{
	try{
		const user=await User.findOne({email:req.body.email})
		if(!user){
			res.send({error:'Email id is not registered'})
		}

		const isMatch=await bcryptjs.compare(req.body.password,user.password)
		if(!isMatch){
			res.send({error:'Invalid password'})
		}

		const token=await user.generatingauthtoken()
		res.cookie('auth_token',token)
		res.redirect('/user/profile')
	}catch(e){
		res.redirect('/')
	}
})

router.post('/forget-password',async(req,res)=>{
	try{
		var message=null,error=null
		const user=await User.findOne({email:req.body.email})
		if(user === null)
		error='Email is not registered'

		if(error === null)
		{
			resetpassword(req.body.email)
			message='Check you emailid and reset your password.'
		}
		res.render('message-reset.ejs',{message,error})
	}catch(e){
		res.render('message-reset.ejs',{message:null,error:'Server error'})
	}
})


router.post('/reset-password',async(req,res)=>{
	try{
		const token=req.query.token
		const decode=jwt.verify(token,'thisismyjwtsecret')

		var message=null,error=null
		if(decode.type !== 'resetpassword')
		error='Wrong token!!'

		if(error === null)
		{
			const user=await User.findOne({email:decode.emailid})
			const password=req.body.password
			user.password=password
			await user.save()
			message='Password changed sucessfully'
		}
		res.render('message-passwordchange.ejs',{message,error})
	}catch(e){
		res.render('message-passwordchange.ejs',{message:null,error:'Server error'})
	}
})


module.exports = router;
