var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, conversation_id, sender_id, participants_id, message_type, attachment_thumb_url, attachment_url, created_at, guid, message;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    conversation_id: conversation_id,
    sender_id: sender_id,
    participants_id: participants_id,
    message_type: message_type,
    message: message,
    attachment_thumb_url: attachment_thumb_url,
    attachment_url: attachment_url,
    created_at: created_at,
    guid: guid
  };
  dbo.collection("messages").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
