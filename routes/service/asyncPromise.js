var Promise = require('promise');

object = [];

const nestedPromiseAll = () => {
    (function () {
        //Our function returns its own promise with our value that needed both the promises to return first
        return new Promise((resolveAll, rejectAll) => {

            let promise1 = new Promise((resolvePromise1, rejectPromise1) => {
                console.log("resolving 1");
                resolvePromise1(1);
            }),
                promise2 = new Promise((resolvePromise2, rejectPromise2) => {
                    console.log("resolving 2");
                    resolvePromise2(2);
                });

            Promise.all([promise1, promise2])
                .then(values => {
                    console.log("resolved 1+2")
                    console.dir(values);
                    resolveAll(values[0] + values[1]);
                })
                .catch(err => {
                    console.dir(err);
                });

        });
    })().then(sum => { console.log(sum) });
};

module.exports = nestedPromiseAll;