var manufacturerModel = require('../../models/manufacturer');

var manufacturerService = {};

manufacturerService.add = function (params, callback) {

    var newManufacturer = new manufacturerModel();
    newManufacturer.barcode = params.barcode;
    product.name = params.name;
    product.city = params.city;
    product.mobile = params.mobile;

    product.save(function (err) {
        if (err)
            callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
        else
            callback(null, { message: 'Operation complete', status: 'success', statusCode: 200 });
    });
};

manufacturerService.show = function (params, callback) {

    var productId = params.productId;

    manufacturerModel.findOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {
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

manufacturerService.update = function (params, callback) {

    var productId = params.productId;

    manufacturerModel.findOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {
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

manufacturerService.delete = function (params, callback) {

    var productId = params.productId;

    manufacturerModel.deleteOne({ 'productId': productId, 'activeStatus': 1 }, function (err, result) {
        if (err)
            callback({ message: 'Error occurred', status: 'error', statusCode: 500 });
        else {
            callback(null, { message: 'Record removed', status: 'success', statusCode: 200 });
        }
    });
};

module.exports = manufacturerService;