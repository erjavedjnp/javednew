const express = require("express");
const router = express.Router();
const crypto=require('crypto');
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const User = require("../../models/user/user.js");
const Image = require("../../models/user/image.js");
//const imgModel = require("../../models/user/Image.js");
const auth=require('../../authentication/user/auth')
const {mailverification,resetpassword} = require("../../emails/mailverification");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');
const user = require("../../models/user/user.js");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
// Mongo URI
const mongoURI = 'mongodb+srv://kanhaiya:asqPXt5aaYPZO4Jx@cluster0.xzm7l.mongodb.net/new?retryWrites=true&w=majority';

// Create mongo connection
//const conn = mongoose.createConnection(mongoURI);

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true });

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  // @route GET /
// @desc Loads form
/*router.get('/ttt', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('ttt', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'  ||
            file.contentType === 'video/mp4'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render('ttt', { files: files });
      }
    });
  });*/
  router.get('/ttt', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('photos', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'  ||
            file.contentType === 'video/mp4'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render('photos', { files: files });
      }
    });
  });
  
  // @route POST /upload
  // @desc  Uploads file to DB
  router.post('/upload',auth, upload.any('file'), (req, res) => {
     //res.json({ file: req.file });
   // console.log( req.file );
    // check for existing images
    //let json = JSON.stringify(req.file );

//alert(typeof json); // we've got a string!
//console.log( json );
//alert(json);
/*gfs.files.find().toArray((err, files) => {
  // Check if files
  if (!files || files.length === 0) {
    return res.status(404).json({
      err: 'No files exist'
    });
  }

  // Files exist
  req.user.imagearray.push(JSON.stringify(files))
    req.user.save()
    
  return res.json(files);
});*/
  
    res.redirect('/userprofile/users');
  });
  
  // @route GET /files
  // @desc  Display all files in JSON
  router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });
  
  // @route GET /files/:filename
  // @desc  Display single file object
  router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });
  
  // @route GET /image/:filename
  // @desc Display Image
  router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });
  router.get('/video/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
     
    });
  });
  
  
  
  // @route DELETE /files/:id
  // @desc  Delete file
  router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/userimage/ttt');
    });
  });
  
  module.exports=router
  