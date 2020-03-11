const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    
  },
  isAdmin: {
    type: Boolean,
    
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    lat: {type:Number},
    lon:{type:Number}
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  phoneNumber:{
    type: String
  },
  avatar:{
    type: String
  }
  
});
module.exports = User = mongoose.model("users", UserSchema);