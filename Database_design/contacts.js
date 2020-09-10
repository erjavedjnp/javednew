var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, users_id, phone_no, email, fname, lname, mname;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    users_id: users_id,
    first_name: fname,
    middle_name: mname,
    last_name: lname,
    phone: phone_no,
    email: email
  };
  dbo.collection("contacts").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
