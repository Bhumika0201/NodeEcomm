const express = require("express");
var mongo = require('mongodb');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const fbusers = require("./routes/api/facebookuser");
const categories=require("./routes/api/categories")
  const products=require("./routes/api/product")
const image=require("./routes/controller")
let multer = require('multer');
let Grid = require('gridfs-stream');

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Setting up the root route


// Setting up the storage element



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/fbusers", fbusers);


app.use("/api/", categories);
app.use("/api/products", products);
//app.post('/upload', controller.uploadFile);

app.use("/api", image);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));