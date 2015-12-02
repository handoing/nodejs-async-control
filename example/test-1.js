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

function eachOf(arr, fn, callback) {
    callback = callback || function() {};
    arr = arr || [];

    if (!arr.length) {
        callback();
    }

    var i = 0;
    arr.forEach(function(val, i) {
        fn(val, i, once(done));
    });

    function done(err) {
        i++;
        if (err) {
            return callback(err);
        }
        if (i === arr.length) {
            callback();
        }
    }
}

eachOf(files, function(val, key, callback) {
    fs.readFile(val, function(err, data) {
        if (err) {
            return callback(err);
        }
        console.log(data.toString());
        callback();
    })
}, function(err) {
    if (err) {
        throw err;
    }
    console.log('add done!');
});
