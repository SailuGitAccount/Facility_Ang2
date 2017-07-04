"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack()',function(){
	it('#throw',function(){
		try{
			ack().throw('test throw',0)
		}catch(e){
			assert(e,'test throw','error thrown incorrectly')
		}

		try{
			ack(new Error('test throw')).throw(null,0)
		}catch(e){
			assert(e.message,'test throw','error message incorrect')
		}
	})

	it('#get',function(){
		var object = ack({test:11, Test:22, TEST:33})
		assert.equal(object.get('test'),11)
		assert.equal(object.get('Test'),22)
		assert.equal(object.get('TEST'),33)
	})

	it('#stringify',function(){
		var object = ack({test:11})
		assert.equal(object.stringify(0),'{"test":11}')
	})

	it('#byName',function(){
		var object = ack({
			test : {x:11, Test:22, TEST:33}
		})
		assert.equal(object.byName('test').get('x'),11)
		assert.equal(object.byName('test').get('Test'),22)
		assert.equal(object.byName('test').get('TEST'),33)
	})

	it('#promise',function(done){
		ack.promise('a','b','c')
		.then(function(a,b,c){
			assert.equal(a, 'a')
			assert.equal(b, 'b')
			assert.equal(c, 'c')
		})
		.then(done).catch(done)
	})

	it('#Promise',function(done){
		ack.Promise(function(res,rej){
			setTimeout(function(){
				res('a','b','c')
			}, 10)
		})
		.then(function(a,b,c){
			assert.equal(a, 'a')
			assert.equal(b, 'b')
			assert.equal(c, 'c')
		})
		.then(done).catch(done)
	})

	it('#nullsToEmptyString',function(){
		var object = {test:11, Test:null, TEST:33}
		ack(object).nullsToEmptyString()
		assert.equal(object.test,11)
		assert.equal(object.Test,'')
		assert.equal(object.TEST,33)
	})

	it('#week',function(){
		var week = ack.week(22)
	})

	it('#indexSelector',function(){
		var indexSelector = ack.indexSelector(['a','b','c'])
	})

	it('#getSimpleClone',function(){
		var scope = {a:1,b:2,c:3,d:null},
			s2 = ack(scope).getSimpleClone()

		s2.test = 33

		assert.equal(scope.test==null,true,'test is not null on original scope')
		assert.equal(s2.a==1,true,'cloning must have failed')
		assert.equal(s2.d==null,true,'cloning must have failed')
	})

	it('#isBooleanLike',function(){
		assert.equal(ack('{"a":false}').isBooleanLike(), false)
		assert.equal(ack('false').isBooleanLike(), true)
		assert.equal(ack('true').isBooleanLike(), true)
		assert.equal(ack('TRUE').isBooleanLike(), true)
		assert.equal(ack('yes').isBooleanLike(), true)
		assert.equal(ack('no').isBooleanLike(), true)
		assert.equal(ack('y').isBooleanLike(), true)
		assert.equal(ack('n').isBooleanLike(), true)
		assert.equal(ack(-1).isBooleanLike(), true)
		assert.equal(ack('null').isBooleanLike(), false)
	})

	it('#getBoolean',function(){
		assert.equal(ack('{"a":false}').getBoolean(), null)
		assert.equal(ack('null').getBoolean(), null)
		assert.equal(ack('false').getBoolean(), false)
		assert.equal(ack('true').getBoolean(), true)
		assert.equal(ack('TRUE').getBoolean(), true)
		assert.equal(ack('yes').getBoolean(), true)
		assert.equal(ack('no').getBoolean(), false)
		assert.equal(ack('y').getBoolean(), true)
		assert.equal(ack('n').getBoolean(), false)
		assert.strictEqual(ack('0').getBoolean(), 0)
		assert.equal(ack(-1).getBoolean(), -1)
	})

	it('#getBit',function(){
		assert.equal(ack('{"a":false}').getBit(), 0)
		assert.equal(ack('null').getBit(), 0)
		assert.equal(ack('false').getBit(), 0)
		assert.equal(ack('true').getBit(), 1)
		assert.equal(ack('TRUE').getBit(), 1)
		assert.equal(ack('yes').getBit(), 1)
		assert.equal(ack('no').getBit(), 0)
		assert.equal(ack('y').getBit(), 1)
		assert.equal(ack('n').getBit(), 0)
		assert.strictEqual(ack('0').getBit(), 0)
		assert.equal(ack(-1).getBit(), 0)
		assert.equal(ack('21').getBit(), 1)
	})
})