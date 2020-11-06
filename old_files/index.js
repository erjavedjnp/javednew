import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import followers from "./follower.js";
/*const express= require("express");
const mongoose= require("mongoose");
const Cors= require("cors");
const followers= require("express");
//const express= require("express");*/
//app config
const app = express();
const port =process.env.PORT || 4000;

const connection_url ='mongodb+srv://kanhaiya:asqPXt5aaYPZO4Jx@cluster0.xzm7l.mongodb.net/exampledatabase?retryWrites=true&w=majority'
//middleware
app.use(express.json());
app.use(Cors());
//mongodb+srv://mak:Kanhaiya@1@cluster0.xzm7l.mongodb.net/exampledatabase?retryWrites=true&w=majority
//db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    UseCreateIndex: true,
    useUnifiedTopology: true,
});
//API end point
app.get('/',(req,res) => res.status(200).send('hello world'));

app.post('/tinder/followers', (req, res) => {
    const dbuser = req.body;

    followers.create(dbuser, (err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/followers', (req, res) => {
    followers.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })

});
//Listener
app.listen(port,() => console.log('listening on localhost: $(port)'));
//ctHlev0TPSLzXFaK
