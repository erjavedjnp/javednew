const express = require("express")
const app =  express();
const multer = require('multer')
const router = express.Router();
const mongoose = require("mongoose");
const auth=require('./../authentication/user/auth')
const User = require("../models/user/user.js");

//const Event = require("../models/events");
const fs = require('fs')
const path = require('path')


//app.use(express.json())






router.get("/" ,(req,res) =>{
	res.render('uploadYourpic')
  })


  var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'./../../','/public/upload2')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


router.post("/update"  ,auth,upload.array('image',5),async(req,res) =>{

    //user = (await User.findById(req.user._id))
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
        const user = await User.findById(req.user._id)
        
            user.avatar = imgarr[0]
    
            await user.save();

            // todo: don't forget to handle err

            res.redirect('/userprofile/users');
        
        
    
    
    
       
       // console.log(newEvent);
        res.redirect("/userprofile/users")

  
})



module.exports = router;