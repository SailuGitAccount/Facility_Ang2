"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.number',function(){
	it('#decimalFormat',function(){
		var decimalF = 467.65484646848,
			decimal0 = 0
		assert.equal(ack.number(decimalF).decimalFormat(),467.65)
		assert.equal(ack.number(decimal0).decimalFormat(),0.00)
	})

  it('#asMinutesToDateTime',function(){
    var d = ack.number(790).asMinutesToDateTime();
    assert.equal(d.getMinutes(), 10)
    assert.equal(d.getHours(), 13)
  })

  it('#asMinutesToTime',function(){
    var tString = ack.number(785).asMinutesToTime();
    var tSplit = tString.split(':')
    assert.equal(tSplit[0], 1)
  })
})

