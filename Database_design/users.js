var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id, phone_no, email, pass, fname, lname, mname, vcode, iact, irep, iblo, cdate, udate;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("walson");
  var myobj = { id: id,
    phone: phone_no,
    email: email,
    password: pass,
    first_name: fname,
    last_name: lname,
    middle_name: mname,
    verification_code: vcode,
    is_active: iact,
    is_reported: irep,
    is_blocked: iblo,
    created_date: cdate,
    updated_date: udate,
  };
  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
