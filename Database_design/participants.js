var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, conversation_id, users_id, type;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    conversation_id: conversation_id,
    users_id: users_id,
    type: type,
  };
  dbo.collection("participants").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
