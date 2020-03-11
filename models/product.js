var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  productName: {
    type: String,
    
  },
  productDescription:{
    type: String,
  },
  productPrice: {
    type: String,
    
  },
  productQuatity: {
    type: Number,
   
  },
  productSeller: {
    type: String,
    
  },
  productSubCategory: {
    type: String,
  },
  productCategory: {
    type: String,
  },

  sgst:{
    type: String
  },
  cgst:{
    type: String
  },
  igst:{
    type: String
  },
  hsnCode:{
    type: String
  },
  photos: [Buffer]

  });

  

productSchema.index({
  productName: 'text',
  productDescription: 'text',
  productCategory:'text'

}, {
  weights: {
    name: 5,
    description: 1,
  },
});

module.exports = mongoose.model('Products', productSchema);