const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CategorySchema = new Schema({
  categoryname: {
    type: String,
    
  },
 
  categoryparent: {
    type: String,
   
  },
  categorysort:{
    type: String
  },

});
module.exports = User = mongoose.model("miscellaneous", CategorySchema);