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






router.get("/update" ,(req,res) =>{
	res.render('uploadYourpic')
  })


  var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'./../../','/public/uploads')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


router.post("/update"  ,upload.array('image',5),(req,res) =>{

    //user = (await User.findById(req.user._id))
            var file = req.files
            var imgarr = [];
            
           for(var i=0;i<file.length;i++){
               var src = file[i].filename;
                imgarr.push(src);
           }
            console.log(req.files)
            
            
        if(!req.file){
            console.log("not received")
        }
      
        User.update({_id: req.user}, {
            'userImage': newfilename
        },
       
        function(err, numberAffected, rawResponse) {
           console.log('new profile update ');
           
        });
   

    
    
    
       
       // console.log(newEvent);
        res.redirect("/userprofile/users")

  
})




module.exports = router;