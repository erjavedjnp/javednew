const express = require("express");
const mongoose = require('mongoose');
const bodyParser =  require("body-parser");
const path = require('path');
const app = express();
const userController = require("./src/Routes/user");
const datemeuserController = require("./src/Routes/datemeuser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const Categories = require('./src/models/categories');
const Products = require('./src/models/products');
const Cart = require('./src/models/cart');

const user = require('./src/models/comment');
const blogs = require('./src/models/blogs');
const reco = require('./src/models/reco');

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const uri = 'mongodb+srv://shouviksur:shouvik1.@cluster0.xsmvn.mongodb.net/marketplace?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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


app.get('/marketplace',async (req,res)=>{

    const categories = await Categories.find()
    const products=await Products.find()
    res.render('market-place',{ categories:categories, products:products})
});

app.get('/product/:id',async (req,res)=>{
  
    const category = await Categories.findById(req.params.id)
    const product=await Products.findById(req.params.id)
    let item;
    if(category!=null)
     item=category;
  
    else if(product!=null)
     item=product;
    res.render('product-detail',{item:item})
    

});
app.get('/cart',async (req,res)=>{
    const items=await Cart.find()
    res.render('product-cart',{items:items})

});
app.post('/product/:id',async (req,res)=>{
    
    const category = await Categories.findById(req.params.id)
    const product=await Products.findById(req.params.id)
    var item;
    if(category!=null)
     item=category;
  
    else if(product!=null)
     item=product;

    let newitem=new Cart({
        name:item.name,
        price:item.price,
        originalprice:item.originalprice,
        number:1,
        imgurl:item.imgurl
    })
    newitem=await newitem.save()
    res.redirect('/cart')
});

app.delete('/cart/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
    res.redirect('/cart')
  });
  app.put('/cart', async (req, res) => {
   
     
    
    res.redirect('/cart')
    
  });
  


app.get('/blogs',(req,res)=>{
    res.render('blogs',{})
});

app.get('/blog/:name',(req,res)=>{
    console.log(req.params.name)
    res.render('blog-detail',{})
});
app.use('/public', express.static('blog_detail'));

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




app.listen(5000, () =>{
    console.log("server running at port 5000")
})