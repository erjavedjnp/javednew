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

router.post('/addstore',(req,res)=>{
    // console.log(req.files)
    const {title,link,imgurl,isfeatured} = req.body
    console.log(req.body);
    // var file = req.files;
        var temp=new String;
        cloudinary.uploader.upload(imgurl,(error,result)=>{
            console.log(error);
            console.log(result);
            temp = result.url;
        });
    const newstore = new Stores({title,imgurl:temp,link,isfeatured})
    newstore.save()
    res.redirect('/platform/addstore');
});

router.post('/addproduct',(req,res)=>{
    const {title,imgurl,price,link,isfeatured} = req.body
    // var file = req.files
    var temp=new String;
        cloudinary.uploader.upload(imgurl,(error,result)=>{
            // console.log(error);
            // console.log(result);
            temp = result.url;
        });
    const newproduct = new Products({title,price,img:temp,link,isfeatured})
    newproduct.save()
    res.redirect('/platform')
});

module.exports = router;