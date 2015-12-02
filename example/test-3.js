var fs = require('fs');
var files = ['./docs/1.txt', './docs/2.txt', './docs/3.txt', './docs/4.txt', './docs/5.txt'];

function once(fn) {
    return function() {
        if (!fn) {
            return;
        }
        fn.apply(this, arguments);
        fn = null;
    };
}

function eachOfSeries(arr, fn, callback) {
    callback = once(callback || function() {});
    arr = arr || [];

    var i = -1;
    var sync = true;

    next();

    function next() {
        sync = true;

        if (++i === arr.length) {
            return callback();
        }

        fn(arr[i], i, once(done));

        sync = false;
    }

    function done(err) {
        if (err) {
            return callback(err);
        }
        if (sync) {
            setImmediate(next);
        } else {
            next();
        }
    }
}

eachOfSeries(files, function(val, key, callback) {
    fs.readFile(val, function(err, data) {
        if (err) {
            return callback(err);
        }
        console.log(data.toString());
        callback();
    });
}, function(err) {
    if (err) {
        throw err;
    }
    console.log('all done!');
});
