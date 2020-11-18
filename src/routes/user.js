const express = require('express');
const router = express.Router();
const comfortzoneroutes = require('../routes/comfort-zone');
router.get('/',(req,res)=>{
    res.render('id',{})
});

router.get('/dashboard',(req,res)=>{
    res.render('dashboard',{})
});

router.get('/cart',(req,res)=>{
    res.render('product-cart',{})
});

router.get('/nearby',(req,res)=>{
    res.render('nearby',{})
});

router.get('/location',(req,res)=>{
    res.render('screen18',{})
});

router.get('/cart-checkout',(req,res)=>{
    res.render('product-checkout',{})
});

router.get('/lock-screen',(req,res)=>{
    res.render('lock-screen',{})
});

router.get('/photos',(req,res)=>{
    res.render('photos',{})
});

router.get('/videos',(req,res)=>{
    res.render('videos',{})
});

router.get('/followers',(req,res)=>{
    res.render('followers',{})
});

router.get('/settings',(req,res)=>{
    res.render('settings',{})
});

router.get('/timeline',(req,res)=>{
    res.render('timeline',{})
});

router.get('/notifications',(req,res)=>{
    res.render('notifications',{})
});

router.get('/messages',(req,res)=>{
    res.render('messages',{})
});

router.get('/:user/chat',(req,res)=>{
    res.render('chat',{})
});

router.get('/newsfeed',(req,res)=>{
    res.render('newsfeed',{})
});

router.get('/about',(req,res)=>{
    res.render('about',{})
});

router.get('/story',(req,res)=>{
    res.render('story',{})
});

router.get('/favpages',(req,res)=>{
    res.render('fav-page',{})
});

router.get('/create-event',(req,res)=>{
    res.render('create-event',{})
});

router.get('/create-page',(req,res)=>{
    res.render('create-new',{})
});

app.use('/comfortzone',comfortzoneroutes);

module.exports = router;