
const express = require("express");
const bodyParser =  require("body-parser");
const path = require('path');
var cors= require('cors');
const app = express();
const userController = require("./Routes/user");
const datemeuserController = require("./Routes/datemeuser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',async(req,res)=>{
    res.render('swipping', {
        users: [
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
            {
                url: "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg"
            },
        ]
    });
});

  app.listen(8000,function() {
      console.log('hearnign on 8000');
  });
