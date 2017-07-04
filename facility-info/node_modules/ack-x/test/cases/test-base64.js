"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.base64',function(){
	it('#toString',function(){
		var iB = ack.base64('NDI=').toString()
		if(iB!=42)throw 'Base64 did not convert to 42: '+iB;
	})
})

