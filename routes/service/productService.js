var ProductModel = require('../../models/productMaster');

var productService = {};

productService.add = function (params, callback) {

    var product = new ProductModel();
    product.productId = params.productId;
    product.name = params.name;
    product.quantity = params.quantity;
    product.price = params.price;

    product.save(function (err) {
        if (err)
            callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
        else
            callback(null, { message: 'Operation complete', status: 'success', statusCode: 200 });
    });
};

productService.show = function (params, callback) {

    var productId = params.productId;

        ProductModel.findOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {

            if (err)
                callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
            else {
                customObject = {};
                customObject.message = 'Operation successful';
                customObject.statusCode = 200;
                customObject.status = 'success';
                customObject.data = [result];

                callback(null, customObject);
            }
        });
};

productService.update = function (params, callback) {

    var productId = params.productId;

    ProductModel.findOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {
        if (err)
            callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
        else if (result == null) {
            callback({ message: 'No record found', status: 'error', statusCode: 404 });
        } else {

            result.quantity = params.quantity;
            result.price = params.price;

            result.save(function (err) {
                if (err)
                    callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
                else
                    callback(null, { message: 'Data updated', status: 'success', statusCode: 200 });
            })
        }
    });
};

productService.delete = function (params, callback) {

    var productId = params.productId;

    ProductModel.deleteOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {
        if (err)
            callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
        else {
            callback(null, { message: 'Record removed', status: 'success', statusCode: 200 });
        }
    });
};

module.exports = productService;