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
    
    /* 
        npm install -g ethereumjs-codesim
        ethereumjs-codesim -C -f echo-test.sol --use-contract 'Echo' --callmethod 'Test(bytes32)' 'echo'
        
        TODO: translate this into a system for the CLAM blockchain
        
        The darkclam hypervisor manages:
            * storage/memory management
            * checkpoints / history
            * magnet system
            * eXtended/abi/cmd/json/system xajs
            * gas management
            * rpc system
            * extended ABI system (new types)
                Input - 
                    Magnet - magnet links as data input
                Output - 
                    Function - an specially encoded function call, can be used to call code in other VMs
            * dependencies
            * x-vm communication
        
        where new DCVM(Buffer bytecode, Buffer trie, Object abi)
            (note, this constructor is ussually called from the Hypervisor)
            bytecode - The VM bytecode, loaded from the [package-name].vm file
            trie - The previous VM state, a Patricia Merkle Tree expressed as a Buffer
            abi - The abi definition as a JavaScript Object, loaded from the [package-name].json file
        
        DCVM.run(Object block, Integer index, Array args, Function cb(Buffer trie, Error err, Buffer return, Integer gasUsed, Array logs), Integer value)
            (note, uses automatic ABI system, to make functions more dynamic)
            block - the Block containing this transaction (encoded and sent to the Function)
            index - the index of this transaction in the block (encoded and sent to the Function)
            args[0] - The function name (entry point)
            args[1 - ARG_LIMIT] - The arguments for the function (automatically encoded)
            cb - 
                trie - The next VM state (hypervisor manages confirmations with a run/rewind system backed by the checkpoint system), a Patricia Merkle Tree expressed as a Buffer; if err return lastState :)
                err - Graceful failing for VMs
                return - Buffer data to return to the Hypervisor (for x-vm communication and direct function calling)
                gasused - Amount of gas used running the selected function, passed back to Hypervisor for x-vm communication
                logs - An Array of logs spit out by the function code
            value - The value transacted (default 0)
    */
    
    Darkclam = function() {
        this.package = packageData;
        //this.vm = new Buffer('60606040526000357c0100000000000000000000000000000000000000000000000000000000900480634e7dc659146037576035565b005b604b60048080359060200190919050506061565b6040518082815260200191505060405180910390f35b60006000600050546040518082815260200191505060405180910390a0816000600050819055506000600050546040518082815260200191505060405180910390a081905060aa565b91905056', 'hex');
        //fs.writeFileSync('vm.dat', this.vm);
        this.hello = new DCVM(this.vm);
        console.log(colors.green.bgBlack('darkclam client v' + packageData['version']));
    };
    
    return Darkclam;
}));
