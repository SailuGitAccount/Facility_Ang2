"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.object',function(){
	it('map',function(done){
		Promise.resolve({a:1,b:2,c:3})
		.then( ack.object.map(item=>item*10) )
		.then( res=>{
			assert.equal(res.a, 10)
			assert.equal(res.b, 20)
			assert.equal(res.c, 30)
		})
		.then(done).catch(done)
	})

	describe('exposed',function(){
		it('#isCyclic',function(){
			var a = {}
			var b = {}
			var c = {}

			a.b=b;b.a=a;

			assert.equal(ack.object(a).isCyclic(), true)
			assert.equal(ack.object(c).isCyclic(), false)
		})

		it('#toCookieString',function(){
			var cString = ack.object({test:22, likely:33}).toCookieString()
			assert.equal(cString, 'test=22; likely=33')
		})
	})
})