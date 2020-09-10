var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, users_id, token, cdate, ddate, devices_id;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    users_id: users_id,
    token: token,
    created_at: cdate,
    deleted_at: ddate,
    devices_id: devices_id
  };
  dbo.collection("access").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
