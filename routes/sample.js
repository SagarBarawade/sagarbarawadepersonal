var express = require('express');
var router = express.Router();

router.get('/:input', function (req, res, next) {

    let input = req.params.input;
    resultArray = [];

    if (input == 0) {
        console.log('Atleast one step needed');
    } else if (input == 1) {
        console.log('Possible number of steps: ' + input);
    } else {

        for (var i = 0; i < (parseInt(input) + 2); i++) {
            if (resultArray.length == 0)
                resultArray.push(0);
            else if (resultArray.length == 1)
                resultArray.push(1);
            else {
                //console.log(resultArray[i - 1]);
                let number = resultArray[i - 1] + resultArray[i - 2];
                resultArray.push(number);
            }
        }
        let ways = resultArray.pop();
        console.log('Possible number of steps: ' + ways);
    }
});