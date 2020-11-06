var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + 'views');
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.methodOverride());


//app.use('/new', require('./routes/welcome.js'));
app.use(express.static(path.join(__dirname, 'public')));

//mongo connection
mongoose.connect('mongodb://localhost/Company');

//schema
var Schema = new mongoose.Schema({
_id : String,
name: String,
lname: String,
about: String,
photo: String,
age : Number
});
var user = mongoose.model('recommendation', Schema);
//get routes
app.get('/mak', function(req, res){
    user.find({}, function(err, docs){
    if(err) res.json(err);
    else res.render('swipping2', {users: docs});
    });
    });
//post routes
app.post('/new', function(req, res){
new user({
_id : req.body.email,
name: req.body.name,
lname: req.body.lname,
about: req.body.about,
photo: req.body.photo,
age : req.body.age
}).save(function(err, doc){
if(err) res.json(err);
else res.redirect('/mak')
});
});



//final
var server = http.createServer(app).listen(app.get('port'), function(){ console.log('Express server listening on port ' + app.get('port'));
});
