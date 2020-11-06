var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("userdb");
  var myobj =[{
	"name"   : "Mak",
	"photo"  : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg",
	"values" : "1",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "dhruv",
    "photo"  : "http://a4.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE1ODA0OTcxMjc3MzIxNzQx.jpg",
    "values" : "2",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "walson",
    "photo"  : "http://a1.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE5NDg0MDU1MDEwMjQ4MjA3.jpg",
    "values" : "3",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "cristin",
    "photo"  : "http://a1.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE4MDAzNDEwNjEwMzI1MDA2.jpg",
    "values" : "4",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "chnadan",
    "photo"  : "http://cdn.history.com/sites/2/2013/11/James_Monroe-AB.jpeg",
    "values" : "7",
	"age"  :'18',
	"gender":"female",
	"distance":"40"
   },
   {"name"   : "raj sir",
    "photo"  : "http://a3.files.biography.com/image/upload/c_fit,cs_srgb,dpr_1.0,h_1200,q_80,w_1200/MTE5NTU2MzE2MTM1MzkyNzc5.jpg",
    "values" : "7",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "Amit sir",
    "photo"  : "http://cdn.history.com/sites/2/2013/11/Andrew_Jackson-AB.jpeg",
    "values" : "7",
	"age"  :'18',
	"gender":"male",
	"distance":"18"
   },
   {"name"   : "shuvyanshu",
    "photo"  : "http://cdn.history.com/sites/2/2013/11/Martin_Van_Buren-AB.jpeg",
    "values" : "8",
	"age"  :'22',
	"gender":"female",
	"distance":"50"
   },
   {"name"   : "chnadan",
    "photo"  : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/William_Henry_Harrison_daguerreotype_edit.jpg/220px-William_Henry_Harrison_daguerreotype_edit.jpg",
    "values" : "8",
	"age"  :'16',
	"gender":"female",
	"distance":"11"
   },
   {"name"   : "shubham",
    "photo"  : "https://upload.wikimedia.org/wikipedia/commons/2/2f/Tyler_Daguerreotype_crop_(restoration).jpg",
    "values" : "10",
	"age"  :'22',
	"gender":"male",
	"distance":"22"
},
{

    "name"   : "jyoti",
        "photo"  : "https://upload.wikimedia.org/wikipedia/commons/2/2f/Tyler_Daguerreotype_crop_(restoration).jpg",
        "values" : "10",
        "age"  :'18',
        "gender":"female",
        "distance":"22"
    
    }
    
];
dbo.collection("final").insertMany(myobj, function(err, res) {
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
  dbo.collection("final").find({$and :[{"values":{$in:["8","10"]}},{"gender":"male"},{"distance":{$in:["11","22"]}},{"age":{$in:["22","26"]}}]}).toArray(function(err, result) {
    if (err) throw err;
    for(var i = 0; i < result.length; i++)
      {
          var a = result[i].photo;
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


