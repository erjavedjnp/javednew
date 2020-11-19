const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path')
const User = require("../models/user-profile")
const Post = require("../models/post");
const { where } = require("../models/user-profile");

app.use(express.json())

//get users
router.post("/users", (req,res,next) =>{
  const {username,password,avatar,avatarId,name,bio} = req.body;
  const newUser = new User({
    username,
    password,
    avatar,
    avatarId, 
    name,
    bio
  })
  newUser.save();
  res.json({message: "success", user : newUser})
})
router.get("/users/:user_id", async (req, res) => {
  let newUser = {};

  newUser = (await User.findById(req.params.user_id)).populate("posts")

  let posts = await Post.find().where("author.id").equals(req.params.user_id)
  
  res.json({user: newUser, posts: posts.map(post => post)})
    console.log(newUser)
});

router.post("/posts/:userid" , async (req,res,next) =>{
  let userfound = await User.findById(req.params.userid)
  const {image, imageId, description,tags} = req.body
  
  console.log(userfound)
  const newPost = new Post({
    image,
    imageId,
    description,
    author:{
      id: req.params.userid,
      
    },
    tags
  })
  newPost.save();
  await userfound.posts.push(newPost)
  userfound.save();
  
  res.json({post: newPost})
})



module.exports = router