require('dotenv').config()

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const eventroutes = require("./routes/event-routes")
const jwt = require('jsonwebtoken')
const userroutes = require("./routes/user-route")



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())

app.use(express.static(__dirname));

app.use("/events", eventroutes);
app.use("/users", userroutes)




mongoose
.connect("mongodb+srv://Yashika:CMWtdyqRGa3znUhU@cluster0.sw7ru.mongodb.net/users?retryWrites=true&w=majority")
.then(() =>{
    app.listen(3000, () =>{
        console.log("server running at port 3000")
    })
})
.catch(err =>{
    console.log(err)
}) 




