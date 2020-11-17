const express = require("express")
const app =  express();
const multer = require('multer')
const router = express.Router();
const mongoose = require("mongoose");

const Products = require("../models/featuredproducts");
const Stores = require("../models/featuredstores");
const fs = require('fs')
const path = require('path')


app.use(express.json())

// GET Routes

router.get('/',(req,res)=>{
    const products = Products.find()
    const stores = Stores.find()
    res.render('platform',{products:products, stores:stores})
});

router.get('/stores',(req,res)=>{
    const stores = Stores.find()
    res.render('stores',{})
});

router.get('/addstore',(req,res)=>{
    res.render('addstore',{})
});

router.get('/addproduct',(req,res)=>{
    res.render('addproduct',{})
});

// POST Routes

router.post('/addstore',(req,res)=>{
    const {title,link,isfeatured} = req.body
    var file = req.files
    var imgarr = [];
            
    for(var i=0;i<file.length;i++){
        var src = file[i].filename;
        imgarr.push(src);
    }
    const newstore = new Stores({title,img:imgarr,link,isfeatured})
    newstore.save()
});

router.post('/addproduct',(req,res)=>{
    const {title,price,link,isfeatured} = req.body
    var file = req.files
    var imgarr = [];
            
    for(var i=0;i<file.length;i++){
        var src = file[i].filename;
        imgarr.push(src);
    }
    const newproduct = new Products({title,price,img:imgarr,link,isfeatured})
    newproduct.save()
    res.redirect('/')
});

module.exports = router;