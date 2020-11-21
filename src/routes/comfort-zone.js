const express = require('express');
const app = express();
const router  = express.Router();
const mongoose = require('mongoose');
const products = require('../models/featuredproducts');
const notifications = require('../models/notifications');
const users = require('../models/user');
const gifts = require("../models/gift");
app.use(express.json())

// GET Routes


router.get('/send-gift/:user2',(req,res)=>{
    var loginuser;
    user = req.params.user;
    users.findById(user,(err,res)=>{
        if(!err) {
            console.log("user found");
            loginuser = res;
        }
    })
    var query = { isfeatured : true };
    var mytop8 = loginuser.mytop8;
    var gifts = products.find(query);
    res.render('send-gift',{mytop8:mytop8, gifts:gifts});
});

router.get('/confirm-gift/:user2',(req,res)=>{
    var loginuser;
    user = req.params.user;
    users.findById(user,(err,res)=>{
        if(!err) {
            console.log("user found");
            loginuser = res;
        }
    });

});

// POST Routes

router.post('/send-gift/:user2',(req,res)=>{
    var user = req.params.user2
    var receiver;
    var productid = req.body.product
    users.findById(user,(err,res)=>{
        if(!err) {
            console.log("user found");
            receiver = res;
        }
    }); 
    user = req.params.user
    var sender;
    users.findById(user,(err,res)=>{
        if(!err) {
            console.log("user found");
            sender = res;
        }
    }); 
    // var newnotification = new notifications()
    var newgift = new gifts({senderid:sender.id, receiverid:receiver.id, productid})
    newgift.save();
    
    res.redirect('/user/comfort-zone');
}); 

module.exports = router;