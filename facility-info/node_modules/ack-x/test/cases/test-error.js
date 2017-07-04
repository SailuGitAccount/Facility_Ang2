"use strict";
var ack = global.ack,
	assert = require('assert'),
	path = require('path')

describe('ack.error',function(){
	it('#getStackArray',function(){
		var sArray = ack.error(new Error('test')).getStackArray()
		assert.equal(sArray.constructor, Array)
		assert.equal(sArray.length>0, true)
	})

	it('#getType',function(){
		assert.equal(ack.error(new Error('test')).getType(), 'Error')
	})

	it('#getMessage',function(){
		try{
			throw 'the big dog';
		}catch(e){
			assert.equal(ack.error(e).getMessage(), 'the big dog')
		}
	})

	it('#getFilePath',function(){
		var p = ack.error(new Error()).getFilePath()
		assert(p==path.join(__dirname,'test-error.js') || p=='file')
	})

	it('#getFailingObjectName',function(){
		var temp = function(){
			return a+undefined
		}

		try{
			temp()
		}catch(e){
			var jErr = ack.error(e)
			assert.equal(jErr.getFailingObjectName(), 'temp')
		}
	})

	it('#getLineNum',function(){
		var ln = ack.error(new Error()).getLineNum()
		assert.equal(ln.constructor, Number)
	})

	describe('#isType',function(){
		it('throw',function(){
			try{
				throw 'test-type';
			}catch(e){
				assert.equal(ack.error(e).isType('test-type'), true)
			}
		})

		it('newError',function(){
			var e = new Error('test-type')
			assert.equal(ack.error(e).isType('test-type'), true)
		})
	})

	it('getTraceArray(2)',function(){
		var jE = ack.error( new Error('my test cut') )
		var len = jE.getTraceArray(2).length
		assert(len==2||len==0)//in browser its 0
	})

	it('#cutFirstTrace',function(){
		var e = new Error('my test cut')
		var jE = ack.error(e)

		var sa0 = jE.getStackArray()
		var sa0Length = sa0.length
		var sa02 = sa0[2]

		var sa1 = jE.cutFirstTrace().getStackArray()

		assert(sa0Length-1==sa1.length || sa0Length-1==0)//in browser its 0
		assert.equal(sa0[0], sa1[0])
		assert.equal(sa02, sa1[1])
	})
})