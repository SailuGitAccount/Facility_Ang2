"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.year',function(){
	var t14

	beforeEach(function(){
		t14 = ack.year(2014)
	})

	it('#getYear',function(){
		assert.equal(t14.getYear(),2014)
	})

	it('#getWeek',function(){
		assert.equal(t14.getWeek(),1)
	})

	it('#getMonth',function(){
		assert.equal(t14.getMonth(),1)
	})

	it('#getDateOfFirstWeekday',function(){
		var t14_FirstWeekDay = t14.xDate().getDateOfFirstWeekday()
		assert.equal(t14_FirstWeekDay.getFullYear(),2013)
		assert.equal(t14_FirstWeekDay.getMonth()+1,12)
		assert.equal(t14_FirstWeekDay.getDate(),30)
	})
})