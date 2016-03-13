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
    
    //create a new VM instance
    var vm = new VM();
    
    //create an abi instance
    var abi = new ABI();
    
    var code = '606060405260aa8060106000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480634e7dc659146037576035565b005b604b60048080359060200190919050506061565b6040518082815260200191505060405180910390f35b6000816040518082815260200191505060405180910390a0816000600050819055506000600050546040518082815260200191505060405180910390a081905060a5565b91905056';
    /* DECOMPILED CODE 
        6060
        0x60 PUSH1; 0x60
        
        6040
        0x40 PUSH1; 0x40
        
        52
        0x52 MSTORE; Save word to memory.
        
        60aa
        0x60 PUSH1; 0xaa
        
        80
        0x80 DUP1; Duplicate 1st stack item
        
        6010
        0x60 PUSH1; 0x10
        
        6000
        0x60 PUSH1; 0x00
        
        39
        0x39 CODECOPY; Copy code running in current environment to memory.
        
        6000
        0x60 PUSH1; 0x00
        
        f3
        0xf3 RETURN; Halt execution returning output data.
    */
    
    var codi = '606060405260aa8060106000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480635a74a205146037576035565b005b604b60048080359060200190919050506061565b6040518082815260200191505060405180910390f35b6000816040518082815260200191505060405180910390a0816000600050819055506000600050546040518082815260200191505060405180910390a081905060a5565b91905056';
    var codx = '60606040525b602c7f68656c6c6f20776f726c64000000000000000000000000000000000000000000603b565b505b60aa806100846000396000f35b6000816040518082815260200191505060405180910390a0816000600050819055506000600050546040518082815260200191505060405180910390a0819050607f565b9190505660606040526000357c0100000000000000000000000000000000000000000000000000000000900480634e7dc659146037576035565b005b604b60048080359060200190919050506061565b6040518082815260200191505060405180910390f35b6000816040518082815260200191505060405180910390a0816000600050819055506000600050546040518082815260200191505060405180910390a081905060a5565b91905056';
    
    
    //code needs to be a buffer
    code = new Buffer(code, 'hex');
    codi = new Buffer(codi, 'hex');
    codx = new Buffer(codx, 'hex');
    
    console.log(code.length);
    console.log(codi.length);
    
    vm.on('step', function(data) {
        //console.log('x', data.opcode.name);
    });
    
    var abx = abi.rawEncode('Test', ['bytes32'], ['hello world']);
    
    console.log(code.indexOf(new Buffer('90048063', 'hex')), abx.length);
    console.log(abx);
    
    vm.runCode({
      code: code,
      data: new Buffer(0),
      gasLimit: new Buffer('ffffffff', 'hex') 
    }, function(err, results){
      console.log('exception', results.exception);
      console.log('logs', results.logs.map(function(v) {
          return v.map(function(x) {
              return x.toString('utf8');
          });
      }));
      console.log('return hash', Hash.sha256(results.return).toString('hex'));
      
      vm.runCode({
          code: codx,
          data: new Buffer(0),
          gasLimit: new Buffer('ffffffff', 'hex')
      }, function(err, results) {
          console.log('exception', results.exception, err);
          console.log('logs', results.logs.map(function(v) {
              return v.map(function(x) {
                  return x.toString('utf8');
              });
          }));
          console.log('return hash', Hash.sha256(results.return).toString('hex'));
      });
    });
    
    DCVM = function(script, state) {
        this.script = script;
        this.vm =  new VM(state);
        
        this.vm.on('step', function(data) {
            console.log(data.opcode.name);
        });
        
        console.log(script);
    };
    
    DCVM.prototype.run = function(data, cb) {
        this.vm.runCode({
            code: this.script,
            data: data,
            gasLimit: new Buffer('ffffff', 'hex')
        }, cb);
    };
    
    return DCVM;
}));
