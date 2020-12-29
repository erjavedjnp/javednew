const express = require("express");
const router = express.Router();
const crypto=require('crypto');
var formidable = require('formidable');
const path = require("path");
//const fs = require("fs");
//const fs = require('fs-extra')
const multer = require("multer");
const User = require("../../models/user/user.js");
const notification = require('../../models/notifications');
//const imgModel = require("../../models/user/Image.js");
const auth=require('../../authentication/user/auth')
const {mailverification,resetpassword} = require("../../emails/mailverification");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');
const user = require("../../models/user/user.js");
//const homeController = require("../../controllers/user/home.js");
const uploadController = require("../../controllers/user/upload.js");
const videouploadController = require("../../controllers/user/upload_video.js");
const bodyParser= require("body-parser")
//const fs = require('fs-extra')
fs = require('fs-extra')
var ObjectId = require('mongodb').ObjectID;
router.use(bodyParser.urlencoded({extended: true}))

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
router.get("/reset",(req,res)=>{
	res.render("reset.ejs")
})

router.get("/forget",(req,res)=>{
	res.render("forget.ejs")
})




// //<-------------->for photo upload<---------------->
//get route for photo upload
/*router.get("/photoupload",auth, async(req,res)=>{
	res.render("index1.ejs")
})*/
router.get("/photoupload",auth, async(req, res)=>{
    res.render('index1.ejs', {
        user: req.user
    });
});
//post route for image upload
router.post("/upload" ,auth,uploadController.uploadFiles);
// //<-------------->for photo upload<---------------->

// //<-------------->for video upload<---------------->
/*router.get("/videoupload",auth, async(req, res)=>{
    res.render('screen12.ejs', {
        user: req.user
    });
});*/
router.get('/videoupload', function(req, res) {
	User.find({}, function(err, users) {
	  var userMap = {};
  
	  users.forEach(function(user) {
		userMap[user._id] = user;
	  });
  
	  //res.send(userMap);  
	  res.render('screen12.ejs', {
		userMap:userMap
		
	});
	}).sort( { likes : -1 } );
  });
/*router.get("/videoupload",auth, async(req, res)=>{
    user.find({}, function(err, docs){
    if(err) res.json(err);
    else res.render('screen12', {users: docs});
    });
	});*/
	//get route for video upload
router.get("/videoupload1",auth, async(req,res)=>{
	res.render("for_video.ejs")
})

router.get("/test",auth, async(req,res)=>{
	res.render("12.ejs")
})
//post route for video upload
router.post("/upload1" ,auth,videouploadController.uploadFiles);
//router.get('/video',function(req,res){
//	res.send('you are done');
//})
// //<-------------->for video upload<----------------> assets\featured.mp4C:\Users\LENOVO\Documents\Wrkspace\finalised_branch_to_work\assets\featured.mp4
router.get('/video', auth,async(req, res) =>{
	const path = 'C:/Users/LENOVO/Documents/Wrkspace/Walson-SocailMedia_NJ-kanhaiya/assets/featured.mp4'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	
	if (range) {
	  const parts = range.replace(/bytes=/, "").split("-")
	  const start = parseInt(parts[0], 10)
	  const end = parts[1]
		? parseInt(parts[1], 10)
		: fileSize-1
  
	  if(start >= fileSize) {
		res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
		return
	  }
	 
	  const chunksize = (end-start)+1
	  const file = fs.createReadStream(path, {start, end})
	  const head = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/mp4',
	  }
  
	  res.writeHead(206, head)
	  file.pipe(res)
	} else {
	  const head = {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
	  }
	  res.writeHead(200, head)
	  fs.createReadStream(path).pipe(res)
	}
  })
  router.get('/live',auth,async(req,res)=>{
	res.render('live1.ejs')
})

  // //<-------------->TO READ leader board<---------------->
  router.get("/leaders",auth, async(req, res)=>{
    res.render('screen14.ejs', {
		user: req.user
		
	});
	//console.log(user.name)
});
// //<-------------->TO READ leader board<---------------->
//shwoing the list of users after sorting based on likes
/*router.get('/usersList', function(req, res) {
	User.find({}, function(err, users) {
	  var userMap = {};
  
	  users.forEach(function(user) {
		userMap[user._id] = user;
	  });
  
	  //res.send(userMap);  
	  res.render('screen14.ejs', {
		userMap:userMap
		
	});
	}).sort( { likes : -1 } );
  });*/
  //shwoing the list of users after sorting based on likes
  //db.users.find({ }).sort( { age : -1, posts: 1 } )
  router.get("/search",auth, async(req,res)=>{
	res.render("chorus search.ejs")
})
router.get("/vote",auth, async(req,res)=>{
	res.render("16.ejs")
})
// //<
// //<-------------->TO READ THE USER PROFILE<---------------->
router.get('/id',auth,async(req,res)=>{
	res.render('id.ejs')
})

//<------------> USER profile<---------------->

router.get('/photos',auth,async(req,res)=>{
	res.render('photos.ejs')
})
router.get('/videos',auth,async(req,res)=>{
	res.render('videos.ejs')
})
router.get('/setting',auth,async(req,res)=>{
	res.render('setting.ejs')
})

router.get('/livemap',auth,async(req,res)=>{
	res.render('screen18.ejs')
})
router.get('/followers',auth,async(req,res)=>{
	res.render('followers.ejs')
})



// USER profile

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
//new field


/*var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); */

//var upload = multer({ storage: storage }); 
// Retriving the image 



/*const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dyxr8b2jd', 
  api_key: "174961121367964", 
  api_secret:"PWd0b0uRa201_zfCdS6zii2uxKs" 
});
*/
// Uploading the image 
// Uploading the image 
/*router.post('/upload', upload.single('image'), (req, res, next) => { 
  
    var obj = { 
        name: req.body.name, 
        desc: req.body.desc, 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    imgModel.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.send('done'); 
        } 
    }); 
}); */
/*router.post('/addimage',auth,upload.array('image'),async(req,res)=>{
    try{
        var avatar=[]
        for(var i=0;i<req.files.length;i++)
        {
            const result=await cloudinary.uploader.upload(req.files[i].path)
            avatar=avatar.concat(result.secure_url)
        }
        console.log(req.body)
        const new_product={
            ...req.body,
            avatar,
            user:req.user._id
        }
        

        
        
        await all_tags.save()
       
        console.log(product);
        res.send('done')
    }catch(e){
        console.log(e)
        res.send(e)
    }
})*/
//new field

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
		res.redirect("/user/signup");
	}
  });
  



//======================================
//
//				POST ROUTES   (CHANGES WITH DATABASE AND AUTHORIZATION)
//
//======================================
//server.js

 
// SET STORAGE
/*const storage=multer.diskStorage({
	destination: (req, file, cb) => { 
		cb(null, 'uploads')
  }, 
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now())
	}
  })
   
  var upload = multer({ storage: storage })
const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb+srv://shouviksur:shouvik1.@cluster0.xsmvn.mongodb.net/marketplace?retryWrites=true&w=majority';
 
MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err)
  db = client.db('marketplace') 
  
})*/
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'/../../../','/public/upload2')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
}); 
  
var upload = multer({ storage: storage }); 




router.post("/signup",upload.array('image',5),async(req,res)=>{ 
	//let test=new Object
	var file = req.files
	var imgarr = [];
	
   for(var i=0;i<file.length;i++){
	   var src = file[i].filename;
		imgarr.push(src);
   }
	console.log(req.files)
	console.log(imgarr[0])
	
	
if(!req.file){
	console.log("not received")
}
	try{
		console.log("i m here");
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
			user.avatar=imgarr[0]
			await user.save()
			
			mailverification(user.email, user._id);
			//collageverification('kl.ecerasystem@gmail.com', user._id,user.fullname,user.batch);
			req.flash('error','Email is sent Verify email to login!')
			res.redirect('/user/signup')
			
			
		}
	}catch(e){
		console.log(e)
		res.send(e)
	}
});

router.get('/photos12', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
	
		  const imgArray= result.map(element => element._id);
				console.log(imgArray);
	
	   if (err) return console.log(err)
	   res.send(imgArray)
	
	  
	   
	  })
	});
	router.get('/photos12/:id', (req, res) => {
		var filename = req.params.id;
		
		db.collection('quotes').findOne({'_id': ObjectId(filename) }, (err, result) => {
		
			if (err) return console.log(err)
		
		   res.contentType('image/jpeg');
		   res.send(result.image.buffer)
		  
		   
		  })
		})

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
			resetpassword(req.body.email);
			message='Check you emailid and reset your password.'
		}
		res.render("forget.ejs")
		console.log('reset link send');
	}catch(e){
		//res.render('message-reset.ejs',{message:null,error:'Server error'})
		console.log('something is wrong');
	}
})
//My new routes

/*router.post('/forget',async(req,res)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		if(err){
			console.log(err)
		}
		const token1=buffer.toString("hex")
		User.findOne({email:req.body.email})
		.then(user=>{
			if(!user){
				return res.status(422).json({error:"User dont exist with this mail"})
			}
			user.resetToken=token1
			user.expireToken= Dtae.now()+3600000
			user.save().then((result)=>{
				transporter.sendMail({
					to:user.email,
					from:'kainhaiyalal@gmail.com',
					subject:'Reset your passowrd',
                    html:`<p>Click <a href=""https://localhost:3000/reset/${token1}">here</a> to reset your password</p>`
        
        
				})
				res.json({message:"check your mail"});
			})
		})

	})
})*/

//my new routes

router.post("/reset-password", async (req, res) => {
	try {
	  const token = req.body.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret2");
  
	  var message = null,
		error = null;
	  if (decode.type !== "resetpassword") error = "Wrong token!!";
  
	  if (error === null) {
		const user = await User.findOne({ email: decode.emailid });
		const password = req.body.password;
		user.password = password;
		await user.save();
		message = "Password changed sucessfully";
	  }
	  res.redirect('/user/signin')
	} catch (e) {
		res.send('oops')
	}
  });
//Routes for Profile Picture
router.get("/postme" ,(req,res) =>{
	res.render('uploadYourpic')
  })
router.post('/postme',auth, function(req, res) {
	var form =new formidable.IncomingForm();
	form.parse(req);
	let reqPath= path.join(__dirname, '../../../');
	let newfilename;
	form.on('fileBegin', function(name, file){
		file.path = reqPath+ 'public/upload/'+ req.user.username + file.name;
		newfilename= req.user.username+ file.name;
	});
	form.on('file', function(name, file) {
		User.findOneAndUpdate({
			username: req.user.username
		},
		{
			'userImage': newfilename
		},
		function(err, result){
			if(err) {
				console.log(err);
			}
		});
	});
	req.flash('success_msg', 'Your profile picture has been uploaded');
	res.redirect('/user/id');
}); 

router.get("/postvideo" ,(req,res) =>{
	res.render('uploadYourvideo')
  })
router.post('/postvideo',auth, function(req, res) {
	var form =new formidable.IncomingForm();
	form.parse(req);
	let reqPath= path.join(__dirname, '../../../');
	let newfilename;
	form.on('fileBegin', function(name, file){
		file.path = reqPath+  'public/upload1/'+ req.user.username + file.name;
		newfilename= req.user.username+ file.name;
	});
	form.on('file', function(name, file) {
		User.findOneAndUpdate({
			username: req.user.username
		},
		
	    {
			'userVideo': newfilename
		},
		function(err, result){
			if(err) {
				console.log(err);
			}
		});
	});
	req.flash('success_msg', 'Your video has been uploaded');
	res.redirect('/userprofile/users');
});

router.get('/notification',auth,async(req,res)=>{
	let notifications = await req.user.notification
	let notificationarray = []
	for(const one of notifications) {
		var onenotification = await notification.findById(one)
		notificationarray.push(onenotification)
	}
	console.log(notificationarray)
	res.render('notification.ejs',{notifications : notificationarray,users:req.user})
});

module.exports = router;







