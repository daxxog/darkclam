/* Darkclam
 * welcome to the desert of the real
 * (c) 2016 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.Darkclam = factory();
  }
}(this, function() {
    var DCVM = require('./lib/dcvm.js'),
        colors = require('colors/safe'),
        path = require('path'),
        fs = require('fs'),
        packageData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'UTF-8')),
        Darkclam;
    
    Darkclam = function() {
        this.package = packageData;
        this.hello = new DCVM(new Buffer('6060604052610117806100126000396000f365020232f3a6535060606040526000357c01000000000000000000000000000000000000000000000000000000009004806330b67baa146100445761003f565b610007565b61005160048050506100bf565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156100b15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6020604051908101604052806000815260200150604060405190810160405280600d81526020017f48656c6c6f2c20576f726c6421000000000000000000000000000000000000008152602001509050610114565b9056', 'hex'));
        console.log(colors.green.bgBlack('darkclam client v' + packageData['version']));
        /*this.hello.run(new Buffer('hello world', 'utf8'), function() {
            console.log(arguments, typeof arguments[1].exception);
        });*/
    };
    
    return Darkclam;
}));
