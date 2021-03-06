/* Darkclam / test / basic.js
 * basic test
 * (c) 2016 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var vows = require('vows'),
    assert = require('assert'),
    Darkclam = require('../darkclam.min.js');

vows.describe('basic').addBatch({
    'Darkclam': {
        topic: function() {
        	return typeof Darkclam;
        },
        'is a function': function(topic) {
            assert.equal(topic, 'function');
        }
    }
}).export(module);