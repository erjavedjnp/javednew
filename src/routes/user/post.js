const express=require('express')
const router=express.Router()
const Posts=require('../../models/user/post')
const multer=require('multer')

router.get('/timeline',async(req,res)=>{
    try{
        res.render('timeline.ejs')
        // console.log('yes')
        // const posts=new Posts(req.body)
        // posts.save()
    }catch(e){
        res.send(e)
    }
})


// const cloudinary = require('cloudinary').v2;
// cloudinary.config({ 
//   cloud_name: 'drybfwveo', 
//   api_key: "328354267454673", 
//   api_secret:"K_hc0VA-vOtGG6zzGi3aA1ANRy8" 
// });


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,process.env.PWD+'/storage/postupload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
})

const upload=multer({
    // dest:'name',
    storage,
    limits:{
        fileSize:1000000
      }
    // fileFilter(req,res,cal)
})

router.post("/upload", upload.single("profile"),(req,res)=>{
    var imagename=req.file.filename;
    res.json({
      sucess:1,
      profile_url:`http://localhost:3000/profile/${req.file.filename}`
    })
   /* var imagedetail=newusermodel({
      imagename:imagename
    });*/
    //imagedetail.save(function(err,doc){
      //if(err) throw err;
      //res.send('sucess');
    //})
  });
    

module.exports=router