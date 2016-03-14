/* DCVM
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
        root.DCVM = factory();
  }
}(this, function() {
    var VM = require('ethereumjs-vm'),
        ABI = require('ethereumjs-abi'),
        Hash = require('bitcore-lib').crypto.Hash,
        DCVM;
    
    DCVM = function(hypervisor, bytecode, index, abi) {
        this.bytecode = bytecode;
        this.abi = abi;
        
        console.log(bytecode, abi);
    };
    
    DCVM.prototype.run = function(data, cb) {
        
    };
    
    return DCVM;
}));
