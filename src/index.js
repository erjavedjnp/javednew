const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

  



//console.log(__dirname);

const staticpath = (path.join(__dirname ,'views'));
app.set('view engine', 'hbs');

//  built in middileware

//app.use(express.static(staticpath));
app.get("/",(req,res)=>{
   res.render('Home', {});
});

app.get("/about",(req,res)=>{
   res.render('about', {});
});

app.get("/blog/:name",(req,res)=>{
   console.log(req.params.name);
    res.render('blog-detail' ,{});
 });

 
 app.get("/blogs",(req,res)=>{
    res.render('blogs',{});
 });

 app.get("/chat",(req,res)=>{
    res.render('chat',{});
 });

 app.get("/create-event",(req,res)=>{
    res.render('create-event',{});
 });
 app.get("/create-new",(req,res)=>{
    res.render('create-new',{});
 });

 app.get("/dashboard",(req,res)=>{
    res.render('dashboard',{});
 });

 app.get("/events/:name",(req,res)=>{
    res.render('event-detail',{});
 });
 app.get("/events",(req,res)=>{
    res.render('events',{});
 });
 app.get("/fav-page",(req,res)=>{
    res.render('fav-page',{});
 });
 app.get("/followers",(req,res)=>{
    res.render('followers',{});
 });
 app.get("/groups/:name",(req,res)=>{
    res.render('group-detail',{});
 });
 app.get("/groups",(req,res)=>{
    res.render('groups',{});
 });
 app.get("/lock-screen",(req,res)=>{
    res.render('lock-screen',{});
 });
 app.get("/market-place",(req,res)=>{
    res.render('market-place',{});
 });
 app.get("/messages",(req,res)=>{
    res.render('messages',{});
 });

 app.get("/movie-categories",(req,res)=>{
    res.render('movie-categories',{});
 });
 app.get("/movies/:name",(req,res)=>{
    res.render('movie-single',{});
 });

 app.get("/movies",(req,res)=>{
    res.render('movies',{});
 });

 app.get("/nearby",(req,res)=>{
    res.render('nearby',{});
 });
 app.get("/newsfeed",(req,res)=>{
    res.render('newsfeed',{});
 });
 app.get("/notifications",(req,res)=>{
    res.render('notifications',{});
 });

 app.get("/photos",(req,res)=>{
    res.render('photos',{});
 });

 app.get("/privacy",(req,res)=>{
    res.render('privacy',{});
 });
 app.get("/product-cart",(req,res)=>{
    res.render('product-cart',{});
 });
 app.get("/product-checkout",(req,res)=>{
    res.render('product-checkout',{});
 });
 app.get("/product/:name",(req,res)=>{
    res.render('product-detail',{});
 });
 app.get("/thanks",(req,res)=>{
    res.render('product-thanks',{});
 });
 app.get("/timeline",(req,res)=>{
    res.render('timeline',{});
 });
 app.get("/videos",(req,res)=>{
    res.render('videos',{});
 });


 app.get("/login",(req,res)=>{
   res.render('login',{});
});

app.get("/register",(req,res)=>{
   res.render('signup',{});
});

app.listen(3000,()=>{
    console.log("listening to the port 3000");
 });
 
 