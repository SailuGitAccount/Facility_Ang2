"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.class',function(){
	it('init',function(){
		var c = function(){}

		ack.class(c, {test:22, TEST:44})

		var Class = new c()

		assert.equal( typeof(Class.getTest), 'function')
		assert.equal( typeof(Class.gettest), 'undefined')
		assert.equal( typeof(Class.getTEST), 'function')

		assert.equal(Class.getTest(),22)
		assert.equal(Class.getTEST(),44)
	})
})