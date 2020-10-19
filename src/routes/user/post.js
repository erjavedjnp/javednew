const express=require('express')
const router=express.Router()
const Posts=require('../../models/user/post')
const multer=require('multer')
const cloudinary=require('cloudinary').v2

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

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now())
    }
})

const upload=multer({
    // dest:'name',
    storage
    // fileFilter(req,res,cal)
})


router.post('/post',upload.single('avatar'),upload.single('music'),async(req,res)=>{
    try{
        console.log('yes')
        console.log(req.file)
        // cloudinary.uploader.upload()
        console.log(req.body)
    }catch(e){
        res.send(e)
    }
})

module.exports=router