const express = require("express")
const app =  express();
const router = express.Router();
const notifications = require('../models/notifications');
const users = require('../models/user/user')
const mongoose = require("mongoose");
const auth = require("../authentication/user/auth.js")
const { stringify } = require('uuid');
const { compareSync } = require('bcryptjs');
app.use(express.json())

router.get('/',auth,async(req,res)=>{
  var loginuser = req.user
  var finalarray = []
  var userarray = loginuser.followers.concat(loginuser.following)
  for(const element of userarray) {
    var a = await users.findById(element)
    // console.log(a)
    finalarray.push(a)
  }
  // let finalarray = await userarray.populate("User")
  // console.log(nfollowers)
  // console.log(nfollowing)
  // console.log(userarray)
  console.log(finalarray)
  res.render('friendline.ejs',{nfollowers:loginuser.followers.length,nfollowing:loginuser.following.length,userarray:finalarray})
})

router.post('/follow/:userid',auth, async (req, res) => {
  const loginuser = await req.user
  const otheruser = await users.findById(userid)
  console.log(loginuser)
  console.log(otheruser)
  await loginuser.following.push(userid)
  await loginuser.save()
  await otheruser.followers.push(loginuser._id)
  await otheruser.save()
  var content = new String(" started following you.")
  var fullcontent1  = loginuser.fullname + content 
  var linkstring = new String('/friendline/follow/') + String(loginuser._id)
  const present = otheruser.following.find(one=> one === loginuser._id)
  if(present === undefined) {
    var fullcontent = fullcontent1 + String(' Follow him back.')
    var newnotification = new notifications({content:fullcontent, link:linkstring})
    await newnotification.save()
    await otheruser.notifications.push(newnotification._id)
    await otheruser.save()
  } else {
    var newnotification = new notifications({content:fullcontent1})
    await newnotification.save()
    await otheruser.notifications.push(newnotification._id)
    await otheruser.save()
  }
  res.redirect('/friendline')
  // const { follower, following, action } = req.body;
  // try {
  //     switch(action) {
  //         case 'follow':
  //             await Promise.all([ 
  //                 User.findByIdAndUpdate(follower, { $push: { following: following }}),
  //                 User.findByIdAndUpdate(following, { $push: { followers: follower }})
              
  //             ]);
  //         break;

  //         case 'unfollow':
  //             await Promise.all([ 
  //                 User.findByIdAndUpdate(follower, { $pull: { following: following }}),
  //                 User.findByIdAndUpdate(following, { $pull: { followers: follower }})
              
  //             ]); 
  //         break;

  //         default:
  //             break;
  //     }

  //     res.json({ done: true });
      
  // } catch(err) {
  //     res.json({ done: false });
  // }
});

module.exports = router