const express = require("express");
const bodyParser =  require("body-parser");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/login",(req,res,next) =>{
    res.render("login")
})
app.get("/about" , (req,res,next) =>{
    res.render("about");
})
app.get("/blog-detail" , (req,res,next) =>{
    res.render("blog-detail");
})

app.get("/blogs" , (req,res,next) =>{
    res.render("blogs");
})

app.get("/chat" , (req,res,next) =>{
    res.render("chat");
})

app.get("/create-event" , (req,res,next) =>{
    res.render("create-event");
})

app.get("/create-new" , (req,res,next) =>{
    res.render("create-new");
})

app.get("/create" , (req,res,next) =>{
    res.render("create");
})

app.get("/" , (req,res,next) =>{
    res.render("dashboard");
})

app.get("/eventDetail" , (req,res,next) =>{
    res.render("event-detail");
})

app.get("/events" , (req,res,next) =>{
    res.render("events");
})

app.get("/fav-page" , (req,res,next) =>{
    res.render("fav-page");
})

app.get("/followers" , (req,res,next) =>{
    res.render("followers");
})

app.get("/group-detail" , (req,res,next) =>{
    res.render("group_detail");
})

app.get("/groups" , (req,res,next) =>{
    res.render("group");
})

app.get("/lock-screen" , (req,res,next) =>{
    res.render("lock-screen");
})

app.get("/market-place" , (req,res,next) =>{
    res.render("market-place");
})

app.get("/messages" , (req,res,next) =>{
    res.render("messages");
})

app.get("/movie-categories" , (req,res,next) =>{
    res.render("movies-categories");
})

app.get("/movie-single" , (req,res,next) =>{
    res.render("movie-single");
})

app.get("/movies" , (req,res,next) =>{
    res.render("movies");
})

app.get("/nearby" , (req,res,next) =>{
    res.render("nearby");
})

app.get("/newsfeed" , (req,res,next) =>{
    res.render("newsfeed");
})

app.get("/notifications" , (req,res,next) =>{
    res.render("notifications");
})
app.get("/photos" , (req,res,next) =>{
    res.render("photos");
})
app.get("/privacy" , (req,res,next) =>{
    res.render("privacy");
})
app.get("/product-cart" , (req,res,next) =>{
    res.render("product-cart");
})
app.get("/product-checkout" , (req,res,next) =>{
    res.render("product-checkout");
})
app.get("/product-detail" , (req,res,next) =>{
    res.render("product-detail");
})
app.get("/product-thanks" , (req,res,next) =>{
    res.render("product-thanks");
})

app.get("/settings" , (req,res,next) =>{
    res.render("settings");
})
app.get("/timeline" , (req,res,next) =>{
    res.render("timeline");
})
app.get("/videos" , (req,res,next) =>{
    res.render("videos");
})

app.listen(5000, () =>{
    console.log("server running at port 5000")
})