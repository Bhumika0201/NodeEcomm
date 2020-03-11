const path = require('path');
const express = require('express');
const multer = require('multer');
//const bodyParser = require('body-parser')
const app = express();


const MongoClient = require('mongodb');
const GridFsStorage = require('multer-gridfs-storage')

//I used an mlab Sandbox DB. Substitute the details with your own
const url = "mongodb://127.0.0.1:27017/ecomm";
const dbName = "ecomm";

let storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/ecomm",
  file: (req, file) => {
    return {
      bucketName: 'product/photos/photo',       //Setting collection name, default name is fs
      filename: file.originalname     //Setting file name to original name of file
    }
  }
});

//let upload = null;

  //Setting up upload for a single file
  
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
let upload = multer({storage: storage});

app.post('/upload',upload.single('uploadedfile'), function (req, res) {
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
});





module.exports = app;