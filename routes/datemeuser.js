const express = require('express');
const router = express.Router();

router.get('/register',(req,res)=>{
    res.render('profile',{})
});

router.get('/',(req,res)=>{
    res.render('Screen 23',{})
});

router.get('/chatuser',(req,res)=>{
    res.render('screen25',{})
});

router.get('/date-match',(req,res)=>{
    res.render('date&match',{})
});

module.exports = router;