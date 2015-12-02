# nodejs-async-control #

Reference [http://syaning.com/](http://syaning.com/)

1.并行执行（无最大并行数限制）

`./exmaple/test-1.js`

nodejs的async提供了这样的方法

	async.forEachOf =
    	async.eachOf = function(object, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, key, callback)

	async.forEach =
    	async.each = function(arr, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, callback)


2.并行执行（有最大并行数限制）

`./exmaple/test-2.js`

nodejs的async提供了这样的方法

	async.forEachOfLimit =
    	async.eachOfLimit = function(obj, limit, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, key, callback)
	
	async.forEachLimit =
    	async.eachLimit = function(arr, limit, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, callback)

3.串行执行

`./exmaple/test-3.js`

nodejs的async提供了这样的方法

	async.forEachOfSeries =
    	async.eachOfSeries = function(obj, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, key, callback)

	async.forEachSeries =
    	async.eachSeries = function(arr, iterator, callback) {
        	// ... ...
    	};
	// iterator(val, callback)


