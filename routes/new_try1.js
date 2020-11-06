const express = require('express');
const router = express.Router();

// Welcome Page
router.get('/',  (req, res) => res.send('welcome'));

// Dashboard
router.get('/dashboard', (req, res) =>{
    res.send('dashboard');
});
  
router.get('/mak', function(req, res){
    user.find({}, function(err, docs){
    if(err) res.json(err);
    else res.render('followers2', {users: docs});
    });
    });

module.exports = router;