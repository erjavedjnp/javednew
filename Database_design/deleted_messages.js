var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, messages_id, users_id, ddate;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    messages_id: messages_id,
    users_id: users_id,
    deleted_at: ddate
  };
  dbo.collection("deleted_messages").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
