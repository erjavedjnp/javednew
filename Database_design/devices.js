var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, users_id, device_id, type, token;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    users_id: users_id,
    device_id: device_id,
    device_type: type,
    device_token: token
  };
  dbo.collection("devices").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
