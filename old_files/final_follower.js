var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("kanhaiyadb");
  var myobj =[{
    "name"   : "Mak",
    "last_name":"Mak",
	"photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
	"gmail" : "kanhaiya@iiitmanipur.ac.in",
	"age"  :'18',
	"gender":"male",
	"password":"Kanhaiya@1"
   },
   {"name"   : "kanhaiya",
   "last_name":"Lal",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'18',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "shubham",
   "last_name":"singh",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'18',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "shuryanshu",
    "last_name":"gupta",
	"photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
	"gmail" : "kanhaiya@iiitmanipur.ac.in",
	"age"  :'18',
	"gender":"male",
	"password":"Kanhaiya@1"
   },
   {"name"   : "sneha",
   "last_name":"Rawat",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'18',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "Mak",
   "last_name":"Mak",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'18',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "sikhar",
   "last_name":"singh",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'30',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "shuvyanshu",
   "last_name":"gupta",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'23',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "chnadan",
   "last_name":"singh",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'23',
   "gender":"male",
   "password":"Kanhaiya@1"
   },
   {"name"   : "nilam",
   "last_name":"gupta",
   "photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
   "gmail" : "kanhaiya@iiitmanipur.ac.in",
   "age"  :'20',
   "gender":"female",
   "password":"Kanhaiya@1"
},
{

    "name"   : "jyoti",
    "last_name":"singh",
	"photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
	"gmail" : "kanhaiya@iiitmanipur.ac.in",
	"age"  :'21',
	"gender":"female",
	"password":"Kanhaiya@1"
    
    }
    
];
  dbo.collection("final_follower").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});

var array = [];
var count=0;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("userdb");
  //Find all documents in the customers collection:
  dbo.collection("final_follower").find({}).toArray(function(err, result) {
    if (err) throw err;
    for(var i = 0; i < result.length; i++)
      {
          var a = result[i]._id;
          array.push(a);
          console.log(array[i]);
          count++; 
      }
      console.log(count); 
    db.close();
  });
  console.log(array); 
                 
  return array;
});

/*
router.get('/postedUser/', ensureAuthenticated, function(req, res) {
   User.findOne({_id: req.query.id}, function(err, data) {
        if (err) throw err;
        if (req.user._id == data._id) {
        res.redirect('/users/profile');
        } else {
        res.render('postedUser', {
            data: data
        });
        }
    });
});*/
