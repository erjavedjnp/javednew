const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
app.set('views', path.join(__dirname, 'views'));
///////
app.get("/mak",(req,res)=>{
  res.render('mak.ejs')
});


const multer = require("multer");

//storage engine
const storage=multer.diskStorage({
  destination: "./upload/images",
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
app.use('/profile',express.static('upload/images'));

app.post("/upload", upload.single("profile"),(req,res)=>{

  res.json({
    sucess:1,
    profile_url:`http://localhost:3000/profile/${req.file.filename}`
  })
  
  
});
  


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//router.post("/",upload.single('profile))