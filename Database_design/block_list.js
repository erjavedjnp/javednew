var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, users_id, participants_id, cdate;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    users_id: users_id,
    participants_id: participants_id,
    created_at: cdate
  };
  dbo.collection("block_list").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
