const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RetailorModel = new Schema({
    'barcode': String,
    'ownerName': String,
    'shopName': String,
    'city': Number,
    'price': Number,
    'products': [],
    'activeStatus': { type: Number, default: 1 }
});

var Product = mongoose.model('products', ProductModel);
module.exports = Product;