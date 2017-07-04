"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.string',function(){
	it('#htmlFormat',function(){
		assert.equal(ack.string('<p>test</p>').htmlFormat(), '&lt;p&gt;test&lt;/p&gt;')
	})

	it('#toBase64',function(){
		var result = ack.string(42).toBase64()
		if(result!='NDI=')throw 'string did not convert to base64';
	})

	it('#repeat',function(){
		var result = ack.string(42).repeat(3)
		if(result!='424242')throw 'string did not repeat 3 times';
	})

	it('#isEmail',function(){
		var iE = ack.string('acker.dawn.apple@gmail.com').isEmail()
		assert.equal(iE,true)

		var iE = ack.string('me@shelbedge.com').isEmail()
		assert.equal(iE,true)


		/* fails */
			var iE = ack.string('me@shelbedge.com.burger').isEmail()
			assert.equal(iE,false)

			var iE = ack.string('me@*shelbedge.com').isEmail()
			assert.equal(iE,false)
		/* end:fails */

	})
/*
	it('#isBinary',function(){
		var iB = ack('101010').string().isBinary()
		if(iB!=true)throw 'Binary string not validated as valid binary';
	})

	it('#toBinary',function(){
		var iB = ack('42').string().toBinary()
		if(iB!=101010)throw 'String did not convert to binary: ' + iB;
	})
*/
})
