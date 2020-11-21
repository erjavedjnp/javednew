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
    storage
    // fileFilter(req,res,cal)
})

router.post('/post',upload.array('avatar'),async(req,res)=>{
    try{
        for(var i=0;i<req.files.length;i++)
        {
            if(req.files[i].originalname.match(/\.(png|jpeg|jpg|gif)$/))
            {
                var avatar=req.files[i].filename
            }
            else if(req.files[i].originalname.match(/\.(mp3)$/))
            {
                var audio=req.files[i].filename
            }
            else
            {
                var video=req.files[i].filename
            }            
        }
        const new_post={
            ...req.body,
            avatar,
            audio,
            video
        }
        const post=new Posts(new_post)
        await post.save()
        res.redirect('/user/timeline')
        
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports=router