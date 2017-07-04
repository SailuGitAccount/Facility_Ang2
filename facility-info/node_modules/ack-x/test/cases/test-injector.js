"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.injector',function(){
	it('#define',function(){
		var model = function model(){
			this.testVar=33
			return this
		}
		var loader = function(){
			return new model()
		}
		var injector = ack.injector().define('test', loader)
		var test = injector.test()
		assert.equal(test.constructor, model)
		assert.equal(test.testVar, 33)
	})
})