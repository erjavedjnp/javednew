const connection = require("./model/movie");
const express = require("express");
const bodyParser =  require("body-parser");
const path = require('path');
const app = express();
const userController = require("./Routes/user");
const datemeuserController = require("./Routes/datemeuser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const movieModel = mongoose.model("movie");

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

app.get('/movie/:name',(req,res)=>{
    let choose  = new Array()
    let ChoosenMovie  = req.params.name
    console.log(req.params.name)
    movieModel.find((err,docs)=>{
        if(!err)
        {
            // console.log(docs);
            docs.forEach(function(doc){
                if(doc._id == ChoosenMovie) {
                    console.log(doc._id == ChoosenMovie)
                    choose.push(doc)
                    // console.log(choose)
                    res.render('movie-single',{'movies':choose})
                }
            })
            // res.render()
        }
    });
});

app.get('/movie-categories/:name',(req,res)=>{
    let choosen = req.params.name
    let movies = new Array();
    console.log(choosen)
    movieModel.find((err,docs)=>{
        if(!err)
        {
            // console.log(docs);
            docs.forEach(function(doc){
                if(doc.Category === choosen) {
                    movies.push(doc);
                }
            });
            console.log(movies);
            res.render('movie-categories',{'movies':movies});
            // res.render()
        }
    });
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

app.get('/movies',async(req,res)=>{
    let popular = new Array();
    movieModel.find((err,docs)=>{
        if(!err)
        {
            console.log(docs);
            docs.forEach(function(doc){
                let Rate = Number(doc.Rating)
                if(Rate >= 4.5) {
                    popular.push(doc);
                }
            });
            res.render('movies',{'movies':docs,'popular':popular})
            // res.render()
        }
    });
    // console.log(movies)
});

app.get('/blogs',(req,res)=>{
    res.render('blogs',{})
});

app.get('/blog/:name',(req,res)=>{
    console.log(req.params.name)
    res.render('blog-detail',{})
});

app.get('/events/:name',(req,res)=>{
    res.render('event-detail',{})
});

app.use("/:user",userController);

app.use("/DateMe/:user",datemeuserController);

app.listen(5000, () =>{
    console.log("server running at port 5000")
})

