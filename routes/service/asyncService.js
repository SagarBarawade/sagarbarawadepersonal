var request = require('request');
var Promise = require('promise');

object = [];

const getUserData = async (params) => {

    return new Promise((resolve, reject) => {

        const requestObject = {
            method: 'GET',
            url: 'http://localhost:3000/product/show/' + params
        };

        request(requestObject, function (err, httpResponse, body) {
            if (err)
                return reject('ERROR : ' + err);
            else
                return resolve(JSON.parse(body));
        });
    });
};

const getData = async (X) => {

    return new Promise(function (resolve, reject) {
        
        X = X + 1;

        //throw new Error('Error has occurred'); // this will also be handled in the catch
        if (X == 2) {
            resolve(X);// This will only be returned
        } else {
            reject('Error Handlededed');// This will be handled in catch
        }
    }).catch(function (e) {
        return { message: 'Error has occurred' + e, status: 'error', statusCode: 500 };// You need to write different return statement to send this back to await
    });
}

module.exports = getUserData;
