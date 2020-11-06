var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

//app.use(express.static(path.join(__dirname, 'public')));




//mongo connection
// DB Config
mongoose.connect('mongodb://localhost/db2',{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
// routes
app.use('/', require('./routes/new_try1.js'));






//final
var server = http.createServer(app).listen(app.get('port'), function(){ console.log('Express server listening on port ' + app.get('port'));
});
