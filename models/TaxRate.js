const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TaxRateSchema = new Schema({
  HSN: {
    type: Number,
    
  },
 
  

});
module.exports = User = mongoose.model("taxrates", TaxRateSchema);