const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManufacturerModel = new Schema({
    'barcode': String,
    'name': String,
    'mobile': Number,
    'city': String,
    'timeCreated': { type: Date, default: Date.now() },
    'activeStatus': { type: Number, default: 1 }
});

var Product = mongoose.model('products', ProductModel);
module.exports = Product;