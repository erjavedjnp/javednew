const express = require("express")
const app =  express();
const multer = require('multer')
const router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Products = require("../models/featuredproducts");
const Stores = require("../models/featuredstores");
const fs = require('fs')
const path = require('path')

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(undefined,Date.now()+'-'+file.originalname)
    }
  })
  const upload=multer({
    storage,
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)){
            cb(new Error('File must be an image!!'))   
        }
        cb(undefined,true)
    }
  })
  

cloudinary.config({ 
    cloud_name: 'shuvanshu', 
    api_key: '438498144725888', 
    api_secret: 'TutkX5DDT1tSRil5bbo7g-jvg_U' 
  });

app.use(express.json())

// GET Routes

router.get('/',(req,res)=>{
    var query = { isfeatured : true };
    const products = Products.find(query)
    const stores = Stores.find(query)
    res.render('platform',{products:products, stores:stores})
});

router.get('/stores',(req,res)=>{
    const stores = Stores.find()
    res.render('stores',{stores:stores})
});

router.get('/addstore',(req,res)=>{
    res.render('form',{})
});

router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{})
});

// POST Routes

router.post('/addstore',upload.single('imgurl'),(req,res)=>{
    const {title,link,imgurl,isfeatured} = req.body
        cloudinary.uploader.upload(req.file.path,(error,result)=>{
            console.log(result);
            const newstore = new Stores({title,img:result.url,link,isfeatured})
            newstore.save()
        });
    res.redirect('/platform/addstore');
});

router.post('/addproduct',upload.single('imgurl'),(req,res)=>{
    const {title,imgurl,price,link,isfeatured} = req.body
        cloudinary.uploader.upload(req.file.path,(error,result)=>{
            const newproduct = new Products({title,price,img:result.url,link,isfeatured})
            newproduct.save()
        });
    res.redirect('/platform')
});

module.exports = router;