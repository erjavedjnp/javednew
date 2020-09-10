var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, title, creator_id, channel_id, cdate, udate;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    title: title,
    creator_id: creator_id,
    channel_id: channel_id,
    created_at: cdate,
    updated_at: udate
  };
  dbo.collection("conversation").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
