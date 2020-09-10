var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, users_id, participants_id, report_type, notes, cdate;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    users_id: users_id,
    participants_id: participants_id,
    report_type: report_type,
    notes: notes,
    created_at: cdate
  };
  dbo.collection("reports").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
