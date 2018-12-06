const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductModel = new Schema({
    'productId': Number,
    'name': String,
    'quantity': Number,
    'price': Number,
    'manufacturer': { type: mongoose.Schema.Types.ObjectId, ref: 'manufacturer' },
    'activeStatus': { type: Number, default: 1 }
});

var Product = mongoose.model('productMaster', ProductModel);
module.exports = Product;