const express = require("express")
const app = express()
const bodyParser= require("body-parser")
const cookieParser=require('cookie-parser')
const userloginRoutes=require('./routes/user/login')

//FOR POSTMAN
app.use(express.json())


// <------------>  DATABASE   <-------------->
require('./db/mongoose')


//<------------->  GETTING DATA FROM POST REQUEST  <---------------->
app.use(bodyParser.urlencoded({extended: true}));


//<------------->  SETTING COOKIES TO THE BROWSER  <----------------->
app.use(cookieParser())

//<------------->  SPECIFY THE PATH OF STATIC FILES(eg. css,javascript)  <-------------------->
app.use(express.static( "public"));
      
app.get("/",(req,res)=>{
			res.render('index.ejs')
});


app.use('/user',userloginRoutes)
const PORT = process.env.PORT || 3000;


app.listen(PORT,function()
		  {
	console.log(`Server has started at ${PORT}`);
});