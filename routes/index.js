var express = require('express');
var router = express.Router();
var productService = require('./service/productService');
var getUserData = require('./service/asyncService');
var events = require('events');
var EventEmitter = events.EventEmitter;
var async = require('async');
var Promise = require('promise');
var NestedPromise = require('./service/asyncPromise');

/* GET home page. */
router.get('/', function (req, res, next) {
  var a = 0;
  console.log('a');
  setTimeout(function () { console.log('b'); }, 0);
  do {
    console.log('c');
    a++;
  } while (a <= 1000)
  console.log('d');

  // array = [];
  // STRING.forEach(function (object) {

  //   newObject = { object: 0, positions: [] };
  //   for (let position = 0; position < string.length; position++) {
  //     if (string.charAt(position) === object) {
  //       newObject.object++;
  //       newObject.positions.push(position);
  //     }
  //     if (position == (string.length - 1))
  //       array.push(newObject);
  //   }
  // });

  // setTimeout(function () {
  //   console.log(array);
  // }, 5000);

  // function data(i) {
  //   setTimeout(function () {
  //     console.log(i);
  //   }, 0);
  // }

  // for (let i = 0; i <= 5; i++) {
  //   setTimeout(function () {
  //     console.log(i);
  //     //data(i);
  //   }, 10000);
  // }


  res.json({ message: 'You are connected, work in progress', status: 'success', statusCode: 200 });
});

// Create
router.post('/add', function (req, res, next) {

  object = {};
  object.productId = req.body.productId.trim();
  object.name = req.body.name.trim();
  object.quantity = req.body.quantity.trim();
  object.price = req.body.price.trim();

  productService.add(object, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// show
router.get('/show/:productId', function (req, res, next) {

  object = {};
  object.productId = req.params.productId.trim();

  productService.show(object, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// update
router.put('/update/:productId', function (req, res, next) {

  object = {};
  object.productId = req.params.productId.trim();
  object.quantity = req.body.quantity.trim();
  object.price = req.body.price.trim();

  productService.update(object, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// delete
router.delete('/delete/:productId', function (req, res, next) {

  object = {};
  object.productId = req.params.productId.trim();

  productService.delete(object, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// flowcontroller
router.get('/flowcontroller', function (req, res, next) {

  var object = {};
  object.productId = 2;
  object.name = 'Shampoo';
  object.quantity = 50;
  object.price = 130;

  var flowController = new EventEmitter();

  flowController.on('start', function () {

    productService.add(object, function (err, callback) {
      if (err)
        flowController.emit('error', err);
      else
        flowController.emit('success', callback);
    });
  });

  flowController.on('success', function (successObject) {
    res.json(successObject);
  });

  flowController.on('error', function (errorObject) {
    res.json(errorObject);
  });

  flowController.emit('start');
});

// async.waterfall
router.get('/waterfall', function (req, res, next) {

  var object = {};
  object.productId = 3;
  object.name = 'Spices';
  object.quantity = 50;
  object.price = 60;

  async.waterfall([
    function (callback) {
      productService.add(object, function (err, callbackdata) {
        if (err)
          callback(err);
        else
          callback(null, callbackdata);
      });
    }, function () {
      productService.show(object, function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }], function (err, resolve) {
      if (err)
        res.json(err);
      else
        res.json(resolve);
    });
});

// Promise
router.get('/promise', function (req, res, next) {

  var CalculationPromise = new Promise((resolve, reject) => {
    X = 1;
    X = X + 1;
    //throw new Error('Error has occurred'); // this will also be handled in the catch
    if (X == 2) {
      resolve(X);// This will only be returned
    } else {
      reject('Error Handlededed');// This will be handled in catch
    }
  });

  CalculationPromise.then(function (resolveData) {

    res.json({ Message: 'Its resolved: ' + resolveData });
  }, function (rejectedData) {
    res.json({ Message: 'Its rejected: ' + rejectedData });
  }).catch(function (error) {
    res.json({ Message: 'Its Caught as exception: ' + error });
  });
});

// async.await
router.get('/await/:productId', function (req, res, next) {

  productId = req.params.productId;

  (async function () {
    try {
      let response1 = await getUserData(productId);
      let key1 = response1.data[0].productId;
      let response2 = await getUserData(++key1);
      let key2 = response2.data[0].productId;
      let response3 = await getUserData(++key2);
      let key3 = response3.data[0].productId;
      let response4 = await getUserData(++key3);
      let key4 = response4.data[0].productId;
      let response5 = await getUserData(++key4);
      res.json(response5);

    } catch (err) {

      res.json(err);
    }
  })();
});

// Async promise without api call
router.get('/promise-async', function (req, res, next) {

  //(async function () { var data = await getUserData.getData(1); res.json(data) })();
  // var data = await NestedPromise();
  // res.json(data);

  (function () {
    //Our function returns its own promise with our value that needed both the promises to return first
    return new Promise((resolveAll, rejectAll) => {
      // All promises will start concurrently
      // Then will be called after all the promises are resolved
      // If any promise fails or rejects then whole primse is failed and catch will be called
      // If error needs to be handled specially then also it could be handled
      // Settimeout will not affect the execution of promises
      // In setInterval it will return original value and calculation except post increment.
      // if preincrement is their then pre increment occur & then value returned.
      // If any promise rejects or throw error then immediately the promise terminated
      let promise1 = new Promise((resolvePromise1, rejectPromise1) => {// called first if is first in all[]
        console.log("resolving 1");
        //rejectPromise1('Error has been occurred');
        setTimeout(() => { resolvePromise1(1); }, 10000);
      }),
        promise2 = new Promise((resolvePromise2, rejectPromise2) => {// called subsequently if is first in all[]
          console.log("resolving 2");
          var X = 1;
          //setInterval(() => { console.log("P2 Progress" + X); resolvePromise2(++X) }, 1000);
          setTimeout(() => { resolvePromise2(2); }, 2000);
        }),
        promise3 = new Promise((resolvePromise3, rejectPromise3) => {
          console.log("resolving 3");
          resolvePromise3(3);
        });


      Promise.all([promise1, promise2, promise3])
        .then(values => {
          console.log("resolved 1+2+3")
          console.dir(values);
          resolveAll(values[0] + values[1] + values[2]);
        }, (error) => {
          console.log('Reject handled' + error);
        })
        .catch(err => {
          console.log("Catch called");
          console.dir(err);
        });
    });
  })().then(sum => { console.log(sum) });
});

// service action pattern
// Works exactly the same way as that of promise.all
// any function in between fails then whole async process fails
router.get('/async-parallel/', function (req, res, next) {

  var async = require('async');

  async.parallel({
    one: function (parallelCb) {
      let value = true;
      setTimeout(function () {
        if (value) {
          parallelCb('Error has occurred1');
        } else {
          parallelCb(null, value);
        }
      }, 10000);
    },
    two: function (parallelCb) {
      let value = false;
      if (value) {
        parallelCb('Error has occurred2');
      } else {
        parallelCb(null, value);
      }
    },
    three: function (parallelCb) {
      let value = false;
      if (value) {
        parallelCb('Error has occurred3');
      } else {
        parallelCb(null, value);
      }
    }
  }, function (err, results) {
    if (err) {
      console.log('ERROR EXECUTED');
      console.log(err);
    } else {
      // results will have the results of all 3
      console.log(results);
      //console.log(results.two);
      //console.log(results.three);
    }
  });
});

module.exports = router;
