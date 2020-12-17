const express =  require("express")
const router = express.Router();
const moongoose = require('mongoose')
const Dating = require('../models/dating')
const User = require("../models/user/user");
const cloudinary = require("./cloudnary");
const multer = require("multer")
const auth = require("../authentication/user/auth")
const path = require('path');

const nodeGeocoder = require('node-geocoder');
const options = {
    provider: 'openstreetmap'
  };
const geoCoder = nodeGeocoder(options);

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'..','/uploads')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
  }); 
  
  var upload = multer({ storage: storage }); 

router.get("/" ,(req,res,next) =>{
  res.render("screen22.ejs")
})  

router.post("/profile/",auth, async (req,res,next) =>{
  console.log("post")
  const userid = req.user._id;
 
          console.log("exist")
          const user =  (await User.findById(userid))
          
          const newdating = new Dating({
            fullname : user.fullname,
            username : user.username,
            shotbio : user.biography,
            gender: user.gender,
            age: user.age,
            country : user.country,
            userid : userid,
            
          })

        await  newdating.save();
          user.dating = newdating.id;
        await  user.save();
          console.log(newdating)
         // res.json({user: newdating})
          res.redirect("/datingprofile/create")
          
      
  
})

router.get("/create" , auth, async(req,res,next) =>{
  const user = await Dating.findById(req.user.dating);

  res.render("form2.ejs" ,{
    user : user
  })
})

router.post("/create" , auth, upload.single("image"), async(req,res,next) =>{
  const user = await Dating.findById(req.user.dating)
  const {gender,occupation,country, state,city,height} = req.body

  let url;
  if(req.file) {
    const uploader = async (path) => await cloudinary.uploads(path, "Files")
  
    const file = req.file
    const {path} = file
    const newPath = await uploader(path)
    url = newPath
    user.avatar = url.url;
  }
  user.gender = gender;
  user.occupation = occupation
  user.country = country
  user.state = state
  user.city = city
  user.height = height
  user.save();
  console.log(user)

  res.redirect("/datingprofile/matchingprofiles/")
})

router.get("/newprofile" , (req,res,next) =>{
  res.render("form.ejs")
})

router.post("/newprofile/",auth,upload.single("image") , async(req,res,next) =>{

  let url;
  if(req.file) {
    const uploader = async (path) => await cloudinary.uploads(path, "Files")
  
    const file = req.file
    const {path} = file
    const newPath = await uploader(path)
    url = newPath
   
  }
  //console.log(url)
    const {fullname, shotbio,gender,age,date,occupation,country,state,city,height,fullbio} = req.body
   const userid = req.user._id;
   const user = await User.findById(userid)
   const City=city
   const State=state
   const Country=country
   geoCoder.geocode({
       city: City,
       state:State,
       country: Country,
     }).then((place)=> {
       const Address_user=place
       console.log(Address_user)
       const newdating = new Dating({
        fullname,
        shotbio,
        gender,
        age,
        date,
        occupation,
        country,
        state,
        city,
        height,
        fullbio,
        loc:{type:"Point",coordinates:[Address_user[0].latitude,Address_user[0].longitude]},
        userid: userid,
        avatar : url.url
  
    })
    
    newdating.save()
    user.dating = newdating.id 
    user.save();

  console.log(newdating);
     })
 
/* const files = req.file
  for(const file of files){
    const {path} = file
  const newPath = await uploader(path)
  urls.push(newPath)
  //fs.unlinkSync(path)
  } */

  

  
  res.redirect("/datingprofile/matchingprofiles")


})

//post route for preference form 

router.get("/preferences" , auth,async (req,res,next) =>{
   //create a form for interests, preferances etc.
  
  /*const { age, gender,genderpref , q1} = req.body
  let score = q1

  const user = await Dating.findById(req.user.dating)
  user.age = age,
  user.gender = gender
  user.genderpref = genderpref
  user.score = score
  user.save(); */
  res.render("sc.ejs")
})

router.get("/matchingprofiles/" ,auth, async(req,res,next) =>{  
 await Dating.find({
    "loc":
    { $near :
       {
         $geometry: { type: "Point",  coordinates: [28.5356329,77.3910727] },
       }
    },
    "gender":"female",
    "age":{$gt:21,$lt:30}
}).exec((err,data)=>{
    if (err){
        res.status(500).send(err)
    }else{
        
        console.log(data)
      res.render("main.ejs", {
        data : data
      })
    }
});
   

   
})


router.post("/like/:userid" ,auth, async(req,res,next) =>{
  const user =  (await Dating.findById(req.user.dating))
  const likeuser =  (await Dating.findById(req.params.userid))

  var id = (req.user.id)
  var loggeduserid = JSON.stringify(id)
  console.log(typeof loggeduserid)
  
  await user.likes.push(req.params.userid)
 await user.save()
 console.log(user)
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
    res.redirect("/datingprofile/allmatched")
  }
  //res.json({user : user , likeduser : likeuser})
  console.log(likeuser)
  res.redirect("/datingprofile/matchingprofile")
})

router.post("/dislike/:userid" ,auth, async(req,res,next) =>{
  const user = await Dating.findById(req.user.dating)
  const likeuser = await Dating.findById(req.params.userid)
   
  user.dislike.push(req.params.userid)
  await user.save()
  console.log(user)
  res.redirect("/datingprofile/matchingprofile")

  
})

router.get("/allmatched/", auth, async (req,res,next) =>{
  const user =  (await Dating.findById(req.user.dating))
 const allmatched = user.allmatched
let matched = []
if(allmatched.length > 0){
  for(const all of allmatched){
    const user = await Dating.findById(all)
    matched.push(user)
    
  }
}
 
 console.log(matched) 
 
  res.render("screen25.ejs", {
    matched : matched
  })
  
  
})


router.get("/match/:id" ,auth, async(req,res,next) =>{
  const loggeduser = await Dating.findById(req.user.dating)
  const matcheduser = await Dating.findById(req.params.id)
  console.log(loggeduser)
  console.log(matcheduser)
  res.render("screen24.ejs" , {
    loggeduser : loggeduser,
    matcheduser : matcheduser
  })
})

module.exports = router