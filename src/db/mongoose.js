const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://shouviksur:shouvik1.@cluster0.xsmvn.mongodb.net/marketplace?retryWrites=true&w=majority',
{useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true })
