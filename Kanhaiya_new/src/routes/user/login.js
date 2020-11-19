const express = require("express");
const router = express.Router();
const User = require("../../models/user/user.js");
const auth=require('../../authentication/user/auth')
const {mailverification,resetpassword} = require("../../emails/mailverification");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


router.get('/profile',async(req,res)=>{
	res.render('profile.ejs')
})


router.get("/signup",(req,res)=>{
	res.render("signup.ejs");
});


router.get('/create',async(req,res)=>{
	res.render("create.ejs")
})



router.get("/signin",(req,res)=>{
	res.render("index.ejs")
})
router.get("/forget",(req,res)=>{
	res.render("forget.ejs")
})



// //<-------------->TO READ THE USER PROFILE<---------------->
router.get('/id',auth,async(req,res)=>{
	res.render('id.ejs')
})


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

//Verify the mail id

router.get("/mailverification", async (req, res) => {
	try {
	  const token = req.query.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret");
  
	  var message = null,
		error = null;
	  if (decode.type !== "mailverification") error = "Wrong token";
  
	  const user = await User.findById({ _id: decode._id });
	  if (!user) error = "Invalid user";
  
	  if (error === null) {
		user.mailverified = true;
		await user.save();
		message = "Mail verified";
	  }
	  res.redirect("/user/signin");

	} catch (e) {
	 res.render("message-mailverified")
	}
  });
  



//======================================
//
//				POST ROUTES   (CHANGES WITH DATABASE AND AUTHORIZATION)
//
//======================================


router.post("/signup",async(req,res)=>{ 
	try{
		const email=await User.findOne({email:req.body.email})
		const username=await User.findOne({username:req.body.username})
		console.log('yes')
		if(email)
		{
			console.log('yes')
			req.flash('error','Email is already register!')
			res.redirect('/user/signup')
		}
		else if(username)
		{
			console.log('yes')
			req.flash('error','Username is already register!')

			res.redirect('/user/signup')
		}
		else
		{
			console.log('yes')
			const user=new User(req.body)
			await user.save()
			
			mailverification(user.email, user._id);
			req.flash('error','Email is sent Verify email to login!')
			res.redirect('/user/signup')
			/*res.render("message-register.ejs", {
				   message: "Registered Sucessfully!",
				   error: null,
			 });*/
		}
	}catch(e){
		console.log(e)
		res.send(e)
	}
});




//   CORRECT IT!!!!!!!!
router.post('/signin',async (req,res)=>{
	try{
		const user=await User.findOne({username:req.body.username})
		if(!user){
			req.flash('error','Username is not registered')
			res.redirect('/user/signin')
		}
		else
		{
			const isMatch=await bcryptjs.compare(req.body.password,user.password)
			if(!isMatch){
				req.flash('error','Invalid password')
				res.redirect('/user/signin')
			}
			else
			{
				const token=await user.generatingauthtoken()
				res.cookie('auth_token_2',token)
				res.redirect('/user/id')
			}
		}
	}catch(e){
		res.send('server error')
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
		res.send('done')
	}catch(e){
		res.send('try again')
	}
})


router.post('/reset-password',async(req,res)=>{
	try{
		const token=req.query.token
		const decode=jwt.verify(token,'thisismyjwtsecret2')

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
		res.send('sucess')
	}catch(e){
		res.send('oops')
	}
})


module.exports = router;
