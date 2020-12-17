const express = require('express');
const app = express();
const router  = express.Router();
const mongoose = require('mongoose');
const products = require('../models/featuredproducts');
const notifications = require('../models/notifications');
const posts = require('../models/user/post');
const story = require('../models/story');
const users = require('../models/user/user');
const auth = require('../authentication/user/auth.js')
const gifts = require("../models/gift");
const { stringify } = require('uuid');
const { compareSync } = require('bcryptjs');
app.use(express.json())

// GET Routes

router.get('/',auth,async(req,res)=>{
    var query = { isfeatured: true}
    const gift = await products.find(query)
    const user = req.user
    // console.log(user)
    var topuser = user.mytop8
    var mytop8 = new Array()
    var mytop8posts = new Array()
    topuser.forEach(async(item)=>{
        var a = await users.findById(item)
        mytop8.push(a)
        var post = a.posts 
        post.forEach(async(i) => {
            var p = await posts.findById(i)
            mytop8posts.push(p)  
        })
    })
    res.render('comfort-zone',{mytop8:mytop8, mytop8posts:mytop8posts, gift:gift})
});

router.get('/story/:id',auth,async(req,res)=>{
    const user = req.user
    // console.log(user)
    var selectedstory = user.story 
    var stories = []
    selectedstory.forEach(async(item)=>{
        var a = story.findById(item)
        stories.push(a)
    })
    res.render('story',{stories:stories})
})

router.get('/send-gift',auth,async(req,res)=>{
    var loginuser = req.user;
    var query = { isfeatured : true };
    var mytop8 = []
    var topuser = loginuser.mytop8
    // console.log(topuser)
    topuser.forEach(async(item) => {
        // console.log(item)
        var a = await users.findById(item)
        // console.log(a)
        mytop8.push(a)        
    });
    var gifts =await products.find(query);
    // console.log(mytop8)
    // console.log(gifts)
    res.render('send-gift',{mytop8:mytop8, gifts:gifts});
});

router.get('/confirm-gift/:giftid',auth,async(req,res)=>{
    var loginuser = req.user
    var gift  = await gifts.findById(req.params.giftid)
    const receiver = await users.findById(gift.receiverid)
    const product = await products.findById(gift.productid)
    // console.log(gift)
    // console.log(receiver)
    // console.log(product)
    res.render('confirm-gift',{receiver:receiver,product:product, gift:gift})
});

router.get('/addmytop8',auth,(req,res)=>{
    res.render('addmytop8')
})

// POST Routes

router.post('/addmytop8',auth,async(req,res)=>{
    var user = req.user
    console.log(user)
    const newmytop8 = await users.findById(req.body.userid)
    user.mytop8.push(newmytop8._id)
    user.save()
    res.redirect('/comfortzone')
})

router.post('/send-gift',auth,async(req,res)=>{
    const sender = req.user
    // console.log(req.body)
    const receiver = await users.findById(req.body.receiver)
    const product = await products.findById(req.body.product)
    // console.log(sender)
    // console.log(receiver._id)
    // console.log(product._id)
    var newgift = new gifts({senderid:sender._id, receiverid:receiver._id, productid:product._id})
    newgift.save()
    // console.log(newgift)
    var cont1 = new String(" wants to buy you ")
    var cont2 = new String(". Confirm the address for it by the given link")
    var fullcontent = sender.fullname + cont1 + product.title + cont2
    var linkstring = new String('/confirm-gift/') + String(newgift._id)
    var newnotification = new notifications({content:fullcontent, link:linkstring})
    newnotification.save()
    // console.log(newnotification)
    receiver.notification.push(newnotification._id)
    receiver.save()
    // receiver.notification.forEach(async(item)=>{
    //     console.log(item)
    // })
    // console.log(receiver.notification)
    res.redirect('/comfortzone')
}); 

router.post('/confirm-gift/:giftid',auth,async(req,res)=>{
    const gift = await gifts.findById(req.params.giftid)
    const sender = await users.findById(gift.senderid)
    const receiver = await users.findById(gift.receiverid)
    const product = await products.findById(gift.productid)
    // console.log(gift)
    // console.log(sender)
    // console.log(receiver)
    // console.log(product)
    gift.address = req.body.address
    gift.save()
    var cont1 = new String(" has accepted the gift of ")
    var fullcontent = receiver.firstname + cont1 + product.title
    var linkstring = new String('/confirm-gift/') + String(gift._id)
    var newnotification = new notifications({content:fullcontent, link:linkstring})
    newnotification.save()
    sender.notification.push(newnotification._id)
    sender.save()
    res.redirect('/comfortzone')
});

module.exports = router;