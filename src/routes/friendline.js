const express = require("express") 
const router = express.Router();
const mongoose = require("mongoose");  
const User = require("../models/user/user");  
const auth = require("../authentication/user/auth") 
const Userpersonal = require("../models/user/userMessageSchema")
const Userpersonalmessage = require("../models/user/userMessageSchemaStore")




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

module.exports = router;