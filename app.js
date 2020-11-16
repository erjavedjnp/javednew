const express = require("express");
const bodyParser =  require("body-parser");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const userController = require("./Routes/user");
const datemeuserController = require("./Routes/datemeuser");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const Categories = require('./models/categories');
const Products = require('./models/products');
const Cart = require('./models/cart');

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

app.get('/events/:name',(req,res)=>{
    res.render('event-detail',{})
});

app.use("/:user",userController);

app.use("/DateMe/:user",datemeuserController);

app.listen(5000, () =>{
    console.log("server running at port 5000")
})