var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deliveryInfoSchema = new Schema({
    user: {
    type: String,
    
  },
  address:{
    type: String,
  },
  products: {
    type: Object,}

  });
  deliveryInfoSchema.index({
    user: 'text',
    
  
  });
  
  



module.exports = mongoose.model('DeliveryInfo', deliveryInfoSchema);