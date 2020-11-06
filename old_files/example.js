const express = require("express");
const bodyParser =  require("body-parser");
const path = require('path');
var cors= require('cors');
const app = express();
//const userController = require("./Routes/user");
//const datemeuserController = require("./Routes/datemeuser");
const followerController = require("./Routes/follower");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/',async(req,res)=>{
    res.render('followers2', {
        users: [
            {
               // _id : ObjectId("5f9a79fc0d17a131d0782fad"),
                name : "shuvyanshu",
                last_name : "gupta",
                about: "Engineer",
                photo : "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
                
            },
            {
                //_id : ObjectId("5f9a79fc0d17a131d0782fae"),
                name : "chnadan",
                last_name : "singh",
                about: "Engineer",
                photo : "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
                
            },
        ] 

    });
   
});






app.listen(8000,function() {
      console.log('hearnign on 8000');
  });

  