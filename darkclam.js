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
    var colors = require('colors/safe'),
        path = require('path'),
        fs = require('fs'),
        packageData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'UTF-8')),
        Darkclam;
    
    Darkclam = function() {
        this.package = packageData;
        console.log(colors.green.bgBlack('darkclam client v' + packageData['version']));
    };
    
    return Darkclam;
}));
