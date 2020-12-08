const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path')
const User = require("../models/user/user")
const Post = require("../models/user/post");
const likes = require("../models/user/likes");
const dislikes = require("../models/user/dislikes");
const Comment = require("../models/user/Comment")
const Follow = require("../models/user/followModel")
const cloudinary = require('./cloudnary')
const multer = require('multer');
const fs = require("fs");
const auth = require("../authentication/user/auth.js")



app.use(express.json())


//storage engine
const storage=multer.diskStorage({
  destination: (req, file, cb) => { 
    cb(null,path.join(__dirname ,'..','/src/uploads')) 
}, 
  filename:(req,file,cb)=>{
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({
  storage:storage,
  limits:{
    fileSize:1000000
  }
});
router.get("/" ,(req,res) =>{
  res.render('/userprofile/users')
})



// get users by userId
router.get("/users", auth, async (req, res) => {
  let newUser = {};

  newUser = (await User.findById(req.user._id)).populate("posts")

  let posts = await Post.find().populate("comments").where("author.id").equals(req.user._id)
  //console.log(newUser)
  console.log(posts)
 // res.render('timeline',{user: newUser, posts: posts.map(post => post)})
 res.render('timeline',{users: newUser, posts: posts.map(post => post)})
});

router.post("/posts", auth,upload.single("file"), async(req,res,next)=>{
  let urls = [];
  var imagename=req.file.filename;
  urls.push( imagename)
  let userfound = await User.findById(req.user._id)
  const {description,tags} = req.body
  
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
  
  //res.json({post: newPost})
  /*res.json({
    sucess:1,
    profile_url:`http://localhost:3000/file/${req.file.filename}`
  })*/
 
  console.log(newPost._id)
  //console.log({post: newPost})
  res.redirect('/userprofile/users')
});


// edit userprofile
router.patch("/users/", auth, upload.single("file") ,async (req,res,next) =>{
  const user = await User.findById(req.user._id)

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

router.post("/:postId/comment", async (req, res) => {
  //Find a POst
  const post = await Post.findOne({ _id: req.params.postId });

  //Create a Comment
  const comment = new Comment();
  comment.content = req.body.content;
  comment.post = post._id;
  await comment.save();

  // Associate Post with comment
  post.comments.push(comment._id);
  await post.save();
  console.log(comment.content)
  res.send(comment);
  //res.render('timeline',{comment:comment.content})
});

//Read a Comment

router.get("/:postId/comment", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "comments"
  );
  
  res.send(post);
  //res.render('timeline',{users: newUser})
});
//likes post routes
router.post("/:postId/likes",async (req, res) => {
  //Find a POst
  //let user = await User.findById(req.user._id)
  
  const post = await Post.findOne({ _id: req.params.postId });
//I have to use auth with user id to pass direct loggedin user
  //Create a Comment
  const likes1 = new likes();
  likes1.like = req.body.like;
  //likes.like.push(user._id);
  likes1.post = post._id;
  await likes1.save();

  // Associate Post with comment
  post.likes.push(likes1.id);
  await post.save();

  res.send(likes1);
});


//likes get routes
router.get("/:postId/likes", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "likes"
  );
  res.send(post);
});

//likes post routes
router.post("/:postId/dislikes",async (req, res) => {
  //Find a POst
  //const user = await User.findById(req.user._id)
  const post = await Post.findOne({ _id: req.params.postId });
//I have to use auth with user id to pass direct loggedin user
  //Create a Comment
  const likes1 = new dislikes();
  likes1.dislike = req.body.dislike;
  //likes.like.push(user._id);
  likes1.post = post._id;
  await likes1.save();

  // Associate Post with comment
  post.dislikes.push(likes1.id);
  await post.save();

  res.send(likes1);
});


//likes get routes
router.get("/:postId/dislikes", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "dislikes"
  );
  res.send(post);
});
//following followers

router.post('/follow', async (req, res, next) => {
  const { follower, following, action } = req.body;
  try {
      switch(action) {
          case 'follow':
              await Promise.all([ 
                  User.findByIdAndUpdate(follower, { $push: { following: following }}),
                  User.findByIdAndUpdate(following, { $push: { followers: follower }})
              
              ]);
          break;

          case 'unfollow':
              await Promise.all([ 
                  User.findByIdAndUpdate(follower, { $pull: { following: following }}),
                  User.findByIdAndUpdate(following, { $pull: { followers: follower }})
              
              ]); 
          break;

          default:
              break;
      }

      res.json({ done: true });
      
  } catch(err) {
      res.json({ done: false });
  }
});


module.exports = router