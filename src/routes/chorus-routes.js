const express = require('express');
const app = express();
const router  = express.Router();
const mongoose = require('mongoose');
const auth = require('../authentication/user/auth.js')

// Models used

const users = require('../models/user/user');
const posts = require('../models/user/post');

app.use(express.json())

router.get('/search',auth,async(req,res)=>{
    const mymap = new Map()

    // For Choosen Users
    var choosenusers = new Array()
    var allusers = await users.find()
    allusers.forEach(async(oneuser)=>{
        var count = 0;
        oneuser.posts.forEach(async(onepost)=>{
            count += onepost.likes.length()
        })
        mymap.set(oneuser,count)
        if(count > 10000) {
            choosenusers.push(oneuser)
        }
    })

    // For Top 5 Users
    const mapsort = new Map([...mymap.entries()].sort((a, b) => b[1] - a[1]));
    var max = new Number(5);
    var counter = new Number(0);
    var mytop5user = new Array()
    var mapsortkeys = mapsort.keys()
    for(var one in mapsortkeys) {
        if(counter < max) {
            mytop5user.push(one);
        }
        else {
            break;
        }
    } 

    res.render('chorus-search',{choosenusers:choosenusers,mytop5user:mytop5user})
})

module.exports = router;