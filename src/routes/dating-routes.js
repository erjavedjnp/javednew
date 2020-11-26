const express =  require("express")
const router = express.Router();
const moongoose = require('mongoose')
const Dating = require('../models/dating')
const User = require("../models/user/user");
const { uploads } = require("./cloudnary");
const multer = require("multer")
const auth = require("../authentication/user/auth")

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'..','/uploads')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
  }); 
  
  var upload = multer({ storage: storage }); 

router.post("/profile/",auth, async (req,res,next) =>{
  const userid = req.user._id;
  const {action} = req.body
  switch(action){
      case "existing":
          const user =  (await User.findById(userid))
          
          const newdating = new Dating({
            fullname : user.fullname,
            shotbio : user.biography,
            gender: user.gender,
            age: user.age,
            country : user.country,
            userid : userid,
            avatar : user.avatar
          })

          newdating.save();
          user.dating = newdating.id;
          user.save();

          res.json({user: newdating})
          //redirect to the dating form and fill the fields which are already provided in user model
          break;
       case "new" : 
        res.redirect('/create-new-profile')   
        break;
  }
})

router.post("/newprofile/:userid",upload.array("image") , async(req,res,next) =>{

    const {fullname, shotbio,gender,age,date,occupation,country,state,height,fullbio} = req.body
   
    const uploader = async (path) => await cloudinary.uploads(path, "Files")
  let urls = [];
  const files = req.files
  for(const file of files){
    const {path} = file
  const newPath = await uploader(path)
  urls.push(newPath)
  fs.unlinkSync(path)
  }

  const newdating = new Dating({
      fullname,
      shotbio,
      gender,
      age,
      date,
      occupation,
      country,
      state,
      height,
      fullbio,
      userid: userid,
      avatar : urls[0].url

  })

  newdating.save()

  res.json({user: newdating})


})

//post route for preference form 

router.post("/preferences" , auth,async (req,res,next) =>{
   //create a form for interests, preferances etc.
  
  /*const { age, gender,genderpref , q1} = req.body
  let score = q1

  const user = await Dating.findById(req.user.dating)
  user.age = age,
  user.gender = gender
  user.genderpref = genderpref
  user.score = score
  user.save(); */
})

router.get("/matchingprofiles/" ,auth, async(req,res,next) =>{
   
  //to get the recommended cards
  
  /*  const loggeduser = await Dating.findById(req.user.dating)
   // console.log(loggeduser)

     

    const matches = (await Dating.find({$and :[{age : {$lte :loggeduser.age+2, $gte : loggeduser.age-2}},
      {score : {$lte :loggeduser.score+5, $gte : loggeduser.score-5}},
  {gender : loggeduser.genderpref},
]}))
    console.log(matches) */

    

   
})


router.post("/profile/like/:userid" ,auth, async(req,res,next) =>{
  const user =  (await Dating.findById(req.user.dating))
  const likeuser =  (await Dating.findById(req.params.userid))

  var id = (user._id)
  var loggeduserid = JSON.stringify(id)
  console.log(typeof loggeduserid)
  
  await user.likes.push(req.params.userid)
 await user.save()
 let ismatch
  
     ismatch =  likeuser.likes.find((likeid) => JSON.stringify(likeid) === loggeduserid)
  console.log(ismatch)
  let istrue
  if(ismatch) {
     istrue = true
   }

  if(istrue){
    
    user.allmatched.push(likeuser.id)
    user.save()
    likeuser.allmatched.push(user.id)
    likeuser.save()
    console.log("its a match")
  }
  res.json({user : user , likeduser : likeuser})
  
})

router.post("/profile/dislike/:userid" ,auth, async(req,res,next) =>{
  const user = await Dating.findById(req.user.dating)
  const likeuser = await Dating.findById(req.params.userid)

  user.dislike.push(req.params.userid)
  user.save()

  
})

router.get("/allmatched/", auth, async (req,res,next) =>{
  const user =  (await Dating.findById(req.user.dating)).populate("allmatched")
 const allmatched = user.allmatched
let matched = []
 for(const all of allmatched){
   const user = await Dating.findById(all)
   matched.push(user)
   
 }
  console.log(matched)

  
  
})




module.exports = router