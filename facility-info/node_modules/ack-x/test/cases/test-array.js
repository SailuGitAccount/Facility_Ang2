"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.array',function(){
	it('#objectify',function(){
		var a = [{name:11,test:11},{name:22,test:22},{name:33,test:33}]
		var s = ack.array(a).objectify()
		if(s.name[0] != 11 || s.test[2]!=33)throw 'array failed to be objectified';
	})

	describe('#distinct',function(){
		it('simple',function(){
			var sumArray = [0,1,2,3,4,4]
			var jA = ack.array(sumArray)
			var array = jA.distinct().array
			assert.equal(array.length, 5)
		})

		it('dynamic',function(){
			var sumArray = [{a:0},{a:1},{a:2},{a:3},{a:4},{a:4}]
			var jA = ack.array(sumArray)
			var array = jA.distinct(function(v){return v.a}).array
			assert.equal(array.length, 5)
		})
	})

	it('#each',function(){
		var sumArray = [
			{kid:0, teacher:0},
			{kid:2, teacher:1},
			{kid:2, teacher:1},
			{kid:0, teacher:1},
			{kid:0, teacher:0},
			{kid:2, teacher:1}
		]

		var kidCount = 0
		var staffCount = 0

		var kidCounter = function(v){
			kidCount = kidCount + v.kid
		},
		staffCounter = function(v){
			staffCount = staffCount + v.teacher
		}

		ack.array(sumArray).each(kidCounter, staffCounter)

		assert.equal(kidCount, 6)
		assert.equal(staffCount, 4)
	})

	it('#sum',function(){
		var sumArray = [0,1,2,3,4]
		var jA = ack.array(sumArray)
		assert.equal(jA.sum(),10)
	})

	it('#union',function(){
		var a = ['a','b','c']
		ack.array(a).union(['d','e','g'], ['h','i','j'])
		assert.equal(a.length, 9)
		assert.equal(a[8], 'j')
		assert.equal(a[0], 'a')
	})

	it('#prependArray',function(){
		var a = ['a','b','c']
		ack.array(a).prependArray(['d','e','g'], ['h','i','j'])
		assert.equal(a.length, 9)
		assert.equal(a[0], 'h')
		assert.equal(a[8], 'c')
	})

	describe('#group',function(){
		var array

		beforeEach(function(){
			array = ack.array([2013,2013,2013,2013,2014,2014,2014,2014,2014,2014])
		})

		it('no args',function(){
			var group = array.group()
			assert.equal(group[0].length,4)
			assert.equal(group[1].length,6)
		})

		it('indexed',function(){
			var group = array.group(null,true)
			assert.equal(group[0].length,4)
			assert.equal(group[1].length,6)
		})

		it('value struct',function(){
			var groupStruct = array.group(null,false,'struct')
			assert.equal(groupStruct['2013'][0],2013)
			assert.equal(groupStruct['2013'].length,4)
			assert.equal(groupStruct['2014'].length,6)
		})

		it('index struct',function(){
			var group = array.group(null,true,'struct')
			assert.equal(group['2013'][0],0)
			assert.equal(group['2013'].length,4)
			assert.equal(group['2014'].length,6)
		})
	})
})