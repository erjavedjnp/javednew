var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
// all environments
app.set('port', process.env.PORT || 4000);
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
mongoose.connect('mongodb://localhost/db2');

//schema
var Schema = new mongoose.Schema({
_id : String,
name: String,
lname: String,
about: String,
photo: String,
age : Number
});
var user = mongoose.model('follower2', Schema);
//get routes
app.get('/mak', function(req, res){
    user.find({}, function(err, docs){
    if(err) res.json(err);
    else res.render('followers2', {users: docs});
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

//followerlogic
app.post('/follow', function(req, res) {
    const user_id = req.user._id;
    const to_follow_id = req.body.follow_id;
 
    let bulk = Follow.collection.initializeUnorderedBulkOp();
 
    bulk.find({ 'user': Types.ObjectId(user_id) }).upsert().updateOne({
        $addToSet: {
            following: Types.ObjectId(to_follow_id)
        }
    });
 
    bulk.find({ 'user': Types.ObjectId(to_follow_id) }).upsert().updateOne({
        $addToSet: {
            followers: Types.ObjectId(user_id)
        }
    })
 
    bulk.execute(function(err, doc) {
        if (err) {
            return res.json({
                'state': false,
                'msg': err
            })
        }
        res.json({
            'state': true,
            'msg': 'Followed'
        })
    })
})
//follower logic

//Unfollow logic
app.post('/unfollow', function(req, res) {
    const user_id = req.user._id;
    const to_follow_id = req.body.follow_id;
 
    let bulk = Follow.collection.initializeUnorderedBulkOp();
 
    bulk.find({ 'user': Types.ObjectId(user_id) }).upsert().updateOne({
        $pull: {
            following: Types.ObjectId(to_follow_id)
        }
    });
 
    bulk.find({ 'user': Types.ObjectId(to_follow_id) }).upsert().updateOne({
        $pull: {
            followers: Types.ObjectId(user_id)
        }
    })
 
    bulk.execute(function(err, doc) {
        if (err) {
            return res.json({
                'state': false,
                'msg': err
            })
        }
        res.json({
            'state': true,
            'msg': 'Unfollowed'
        })
    })
})

//unfollow logic

//getting list of followers

app.get('/follow/list', function(req, res) {
    const username = req.query.username;
    
    User.findOne({ 'username': username }, function(err, user) {
        if (!user) {
            return res.json({
                'state': false,
                'msg': `No user found with username ${username}`
            })
        } else {
            const user_id = user._id;
            Follow.aggregate([{
                    $match: {
                        "user": Types.ObjectId(user_id)
                    }
                },
                {
                    $lookup: {
                        "from": "accounts",
                        "localField": "following",
                        "foreignField": "user",
                        "as": "userFollowing"
                    }
                },
                {
                    $lookup: {
                        "from": "accounts",
                        "localField": "followers",
                        "foreignField": "user",
                        "as": "userFollowers"
                    }
                }, {
                    $project: {
                        "user": 1,
                        "userFollowers": 1,
                        "userFollowing": 1
                    }
                }
            ]).exec(function(err, doc) {

                res.json({
                    'state': true,
                    'msg': 'Follow list',
                    'doc': doc
                })
            })
        }

    })

});
//getting list of followers

//final
var server = http.createServer(app).listen(app.get('port'), function(){ console.log('Express server listening on port ' + app.get('port'));
});
