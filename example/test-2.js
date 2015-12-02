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

function eachOfLimit(limit, arr, fn, callback) {
    callback = once(callback || function() {});
    arr = arr || [];

    if (limit <= 0) {
        return callback();
    }

    var i = -1;
    var running = 0;
    var errored = false;

    replenish();

    function replenish() {
        // 当所有任务都已经加入到池子，且当前没有正在执行的任务
        // 说明所有任务都执行完毕，执行callback
        if (i === arr.length && running <= 0) {
            return callback();
        }

        // 只要当前正在执行的任务个数小于限制数，且没有出错
        // 就继续向池子中添加任务
        while (running < limit && !errored) {
            // 如果没有任务可以添加，且没有任务正在运行
            // 说明所有任务都执行完毕，执行callback
            // 这里不需要对running>0的情况进行处理
            // 因为在done中会replenish，最终会进入上面的if判断
            if (++i === arr.length) {
                if (running <= 0) {
                    callback();
                }
                return;
            }

            running++;
            fn(arr[i], i, once(done));
        }
    }

    function done(err) {
        running--;
        if (err) {
            callback(err);
            errored = true;
        } else {
            replenish();
        }
    }
}

eachOfLimit(2, files, function(val, key, callback) {
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
    console.log('all done!');
});
