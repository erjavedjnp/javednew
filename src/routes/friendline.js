const express = require("express") 
const router = express.Router();
const mongoose = require("mongoose");  
const User = require("../models/user/user");  
const auth = require("../authentication/user/auth") 
const Userpersonal = require("../models/user/userMessageSchema")
const Userpersonalmessage = require("../models/user/userMessageSchemaStore")
var multer  = require('multer'); 
var path = require('path')  


const uploadingfiles=async(senderid, message,messagetype,socketlistenid )=>{
   var usermsg = new Userpersonalmessage({
      senderid: senderid,
      message:  message,
      messagetype: messagetype
   }) 
         try{
            usermsg =await usermsg.save()
          await  Userpersonal.findOneAndUpdate(
               { '$push': { 'userpersonalmessages': usermsg._id} }   
               )
               . where('_id').equals(socketlistenid)  
               .exec();  
         }
         catch(err){
            console.log(err)
         }
}

var storage =   multer.diskStorage({
   destination: function (req, file, callback) {
     callback(null, './public/images/userchat/');
   },
   filename: function (req, file, callback) {
     callback(null, Date.now() + path.extname(file.originalname))
   }
 });
 
 const upload = multer({ storage : storage ,
   limits : { 
      fileSize: 1024 * 1024 * 20  
      } 
 }).array('userPhoto',5)



router.get('/',auth,async(req,res)=>{
    //console.log(req.user._id)
   // let userfound = await User.findById(req.user._id)
   let findAllUser = await User.find({_id: { $ne: req.user._id } },'fullname')
   res.render('friendline',{findAllUser:findAllUser})
   
});
 
router.get('/:receiveruserid',auth,async(req,res)=>{
   //console.log(req.user._id)
   let senderid = req.user._id
   let receiveruserid = req.params.receiveruserid   
   let result 
   let  userpersonalget
   userpersonalget = await Userpersonal.findOne({
    $and:[
       {userid1 : {$eq : senderid} },
       {userid2 : {$eq : receiveruserid} }
    ] 
 }) 
 .exec();
 //console.log('first result')
 //console.log(userpersonalget)
 if(userpersonalget===null)
 {
    userpersonalget = await Userpersonal.findOne({
       $and:[
          {userid2 : {$eq : senderid} },
          {userid1 : {$eq : receiveruserid} }
       ] 
    })
    //console.log('second result')
    //console.log(userpersonalget)
 }
 if(userpersonalget!=null){
   // console.log('user chat exist alredy')
    try{
        result = await Userpersonal.findOneAndUpdate()
          . where('_id').equals(userpersonalget._id) 
          .populate('userpersonalmessages')
          .exec();
         //console.log("result is that ",result) 
         return res.render('friendlinechat',{socketlistenid: result._id,senderid: senderid, receiveruserid: receiveruserid, messagedataall: result.userpersonalmessages})
    }
    catch(err){
       console.log(err)
    }
 } else {
   // console.log('user chat not  exist')
    userpersonal = new Userpersonal({
      userid1: senderid,
      userid2: receiveruserid 
   })
   let data = await userpersonal.save()
   //console.log(data)
   return res.render('friendlinechat',{socketlistenid: data._id,senderid: senderid, receiveruserid: receiveruserid, messagedataall: data.userpersonalmessages})
 } 

}); 

 router.post('/chatwithanyone',auth,async(req,res)=>{
    let senderid = req.user._id
    if(!senderid) return false 
    var databody = req.body
    let message = databody.message
    let socketlistenid = databody.socketlistenid
   var usermsg = new Userpersonalmessage({
      senderid:databody.senderid,
      message:message
   })
    

   try{
      usermsg =await usermsg.save()
      await Userpersonal.findOneAndUpdate(
         { '$push': { 'userpersonalmessages': usermsg._id} }   
         )
         . where('_id').equals(socketlistenid)  
         .exec();  
   }
   catch(err){
      console.log(err)
   }
    var data = {status : 'ok'}
    res.json(data)
 });

 router.post('/uploadfiles', async(req,res)=>{ 
    let socketlistenid
    let senderid
    let parentpercentage
    let dataobject = {status : 'ok'} 
   upload(req,res,function(err) { 
      socketlistenid = req.body.socketlistenid
      senderid =  req.body.senderid
      parentpercentage = req.body.parentpercentage 
     if (req.fileValidationError) {
       return res.json(req.fileValidationError);
   }else 
       if(err) {
         if (err.code === "LIMIT_UNEXPECTED_FILE") {
           return res.json({status : "You can upload 5 Maximum number of files"});
         }
         if (err.code === "LIMIT_FILE_SIZE") {
            return res.json({status : "You can upload maximum file size 20 MB ",parentpercentage : parentpercentage});
          }  
           return res.json({status : err})
          
       } 
       if(req.files.length>0){
          var img='image'
         for(i=1;i<=req.files.length;i++){
            dataobject[img+i] = req.files[i-1].filename
           console.log(req.files[i-1].filename)
           console.log(socketlistenid)
           uploadingfiles(senderid, req.files[i-1].filename, 2 ,socketlistenid)
           
             } 
             dataobject['parentpercentage'] = parentpercentage
               return res.json(dataobject);
       } else  {return res.json({status : "You must select at least 1 file"}) }
       
   });
});

module.exports = router;