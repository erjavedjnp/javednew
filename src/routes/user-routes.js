const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path')
const User = require("../models/user/user")
const Post = require("../models/user/post");
const Comment = require("../models/comment")
const cloudinary = require('./cloudnary')
const multer = require('multer');
const fs = require("fs");
const auth = require("../authentication/user/auth.js")



app.use(express.json())

var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null,path.join(__dirname ,'..','/uploads')) 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.originalname) 
  } 
}); 

var upload = multer({ storage: storage }); 

router.get("/" ,(rq,res) =>{
  res.render("image")
})

//create users 
/* router.post("/users", upload.single("file") ,async (req,res,next) =>{
  const {username,password,name,bio} = req.body;

  const uploader = async (path) => await cloudinary.uploads(path, "Files")
    let url ;
    const file = req.file
    const {path} = file
    const newPath = await uploader(path)
    url = newPath

  console.log(url)
    const newUser = new User({
    username,
    password,
    avatar : url.url,
    avatarId : url.id,
    name,
    bio
  })
  newUser.save(); 
  res.json({message: "success", user : newUser}) 
}) */

// get users by userId
router.get("/users/:user_id", async (req, res) => {
  let newUser = {};

  newUser = (await User.findById(req.params.user_id)).populate("posts")

  let posts = await Post.find().populate("comments").where("author.id").equals(req.params.user_id)
  
  res.json({user: newUser, posts: posts.map(post => post)})
    console.log(newUser)
});

// create post 
router.post("/posts/:userid" ,upload.array("file"), async (req,res,next) =>{
  
  let userfound = await User.findById(req.params.userid)
  const {description,tags} = req.body

  const uploader = async (path) => await cloudinary.uploads(path, "Files")
  let urls = [];
  var imagename=req.file.filename;
  urls.push( imagename)
  let userfound = await User.findById(req.user._id)
  const {description,imgurl,tags} = req.body
  cloudinary.uploader.upload(req.file.path,async(error,result)=>{
    console.log(result)
    const newpost = new Post({
      description,
      author:{
        id: userfound._id,
        username: userfound.username,
        avatar  : userfound.avatar
      },
      tags,
      image:result.url
    })
    newpost.save()
    console.log(newpost)
    await userfound.posts.push(newpost)
  userfound.save();
  });
  
  
  console.log(userfound)
  const newPost = new Post({
    image: urls,
    
    description,
    author:{
      id: userfound._id,
      username: userfound.username,
      avatar  : userfound.avatar
    },
    tags
  })
  newPost.save();
  await userfound.posts.push(newPost)
  userfound.save();
  
  res.json({post: newPost})
})



// edit userprofile
router.patch("/users/:userid", upload.single("file") ,async (req,res,next) =>{
  const user = await User.findById(req.params.userid)

  const {username, bio} = req.body

  if(req.file) {
    const uploader = async (path) => await cloudinary.uploads(path, "Files")
    let url;
    const file = req.file
    const {path} = file
    const newPath = await uploader(path)
    url = newPath
    user.avatar = url.url
    user.avatarId = url.id
  }

  
  user.username = username
  user.biography = biography
  await user.save();
  res.json({message: "success", user: user})
})

// comments

router.post("/comments/:postId" , async(req,res,next) =>{
  const post = await Post.findById(req.params.postId)
  
  const {comment} = req.body
  
  const newComment = new Comment({
    comment,
    author:{
      id : post.author.id,
      username: post.author.username,

    },
    post : req.params.postId
  })
  await newComment.save()
  post.comments.push(newComment)
  await post.save()
  res.json({comments : newComment})

})

//following followers



module.exports = router