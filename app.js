const express = require("express");
var mongoose = require('mongoose');
const bodyParser =  require("body-parser");
const path = require('path');
const app = express();
const userController = require("./Routes/user");
const datemeuserController = require("./Routes/datemeuser");
const cookieParser = require("cookie-parser");
const user = require('./models/comment');
const blogs = require('./models/blogs');
const reco = require('./models/reco');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/',async(req,res)=>{
    res.render('create')
});

app.get('/login',(req,res)=>{
    res.render('index',{})
});

app.get('/forget',(req,res)=>{
    res.render('forget',{})
});

app.get('/privacy',(req,res)=>{
    res.render('privacy',{})
});


app.get('/groups',(req,res)=>{
    res.render('groups',{})
});

app.get('/groups/:name',(req,res)=>{
    res.render('group-detail',{})
});

app.get('/movies/:name',(req,res)=>{
    res.render('movie-single',{})
});

app.get('/movie-categories',(req,res)=>{
    res.render('movie-categories',{})
});

app.get('/register',(req,res)=>{
    res.render('signup',{})
});

app.get('/chorus-search',(req,res)=>{
    res.render('chorus-search',{})
});

app.get('/product-detail',(req,res)=>{
    res.render('product-detail',{})
});

app.get('/events',(req,res)=>{
    res.render('events',{})
});

app.get('/marketplace',(req,res)=>{
    res.render('market-place',{})
});

app.get('/product/:name',(req,res)=>{
    res.render('product-detail',{})
});

app.get('/thanks',(req,res)=>{
    res.render('product-thanks',{})
});

app.get('/movies',(req,res)=>{
    res.render('movies',{})
});

app.get('/blogs',(req,res)=>{
    res.render('blogs',{})
});

app.get('/blog/:name',(req,res)=>{
    console.log(req.params.name)
    res.render('blog-detail',{})
});
app.use('/public', express.static('blog_detail'));
mongoose.connect('mongodb://localhost/Company');
//mine
app.get('/mak', function(req, res){
    res.render('blog-detail');
    });
//post routes
app.post('/new', function(req, res){
new user({

about: req.body.about,

}).save(function(err, doc){
if(err) res.json(err);
else res.redirect('/mak')
});
});

    
    //mine
    //for blogs
    app.get('/mak2', function(req, res){
        blogs.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('blogs2', {users: docs});
        });
        });
    //post routes
    app.post('/new', function(req, res){
    new blogs({
    name: req.body.name,
    lname: req.body.lname,
    about: req.body.about,
    photo: req.body.photo,
    age : req.body.age
    }).save(function(err, doc){
    if(err) res.json(err);
    else res.redirect('/mak2')
    });
    });




    //for blogs

    //for recomendation

    
    //get routes
    app.get('/mak3', function(req, res){
        reco.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('swipping2', {users: docs});
        });
        });
    //post routes
    app.post('/new', function(req, res){
    new reco({
        name: req.body.name,
        lname: req.body.lname,
        about: req.body.about,
        photo: req.body.photo,
        age : req.body.age
    }).save(function(err, doc){
    if(err) res.json(err);
    else res.redirect('/mak3')
    });
    });
    



    //recomendations
app.get('/events/:name',(req,res)=>{
    res.render('event-detail',{})
});

app.use("/:user",userController);

app.use("/DateMe/:user",datemeuserController);

app.listen(3456, () =>{
    console.log("server running at port 3456")
})