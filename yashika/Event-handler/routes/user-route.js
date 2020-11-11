const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path')

app.use(express.json())

const DUMMY_USERS = [
    {
        name: "john",
        age: 19,
        email: "john@test.com"
    },
    {
        name: "joe",
        age: 20,
        email: "joe@test.com"
    }
]


router.get('/', (req,res,next) =>{
    res.render("search");
})

router.post("/search" , (req,res,next) =>{
 const search = req.query.search
 console.log(search)
 
})

module.exports = router