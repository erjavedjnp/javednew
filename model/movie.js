const mongoose =require('mongoose');
mongoose.connect("mongodb://localhost:27017/Movie",{ useNewUrlParser: true , useUnifiedTopology: true },(error)=>{
    if(!error)
    {
        console.log("Success Connected");
    }
    else{
        console.log("Error connecting to database");
    }
});

var movieSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:"required"
    },
    Category:{
        type:String,
        required:"required"
    },
    Country : {
        type: String,
        required:"required"
    },
    ImgUrl : {
        type:String,
        required:"required"
    },
    Rating : {
        type:Number,
        required:"required"
    },
    Cast : {
        type: Object,
    },
    Synopsis : {
        type: String,
        required:"required"
    }
},{collection:'movie'});

mongoose.model("movie",movieSchema);
