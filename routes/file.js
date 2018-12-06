var express = require('express');
var router = express.Router();
var multer = require('multer');
var os = require('os');
var productService = require('./service/fileOperationService');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/file/binary', function (req, res, next) {
    multer({
        dest: os.tmpdir() + '/',
        limits: { files: 1 }
    }, next());
}, function (req, res) {
    //console.log(req.files);
    var object = {
        file: req.files.File1,
        userId: req.body.userId.trim()
    };

    productService.fileOperation(object, function (err, result) {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
});

router.post('/file/base64', function (req, res, next) {

    var object = {
        file: req.body.File1,
        userId: req.body.userId.trim()
    };

    productService.fileOperations(object, function (err, result) {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
});

router.get('/readfile/', function (req, res, next) {

    productService.fileOperationRead(function (err, result) {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
});

module.exports = router;
