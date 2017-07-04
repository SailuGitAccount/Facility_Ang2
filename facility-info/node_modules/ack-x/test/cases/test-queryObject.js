"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.queryObject',function(){
	describe('#Csv.#toArray',function(){
		it('basic',function(){
			var data = {firstName:['acker','nick'],lastName:['apple','acker']}
			var Csv = ack.queryObject(data).Csv()
			var titleArray = Csv.getTitleArray()
			var csvArray = Csv.toArray()
			//console.log(csvArray)
			if(csvArray.length!=data.firstName.length+1)throw 'queryObject did not convert toCsvArray correctly';
			if(titleArray.length!=Object.keys(data).length)throw 'queryObject did create correct title array';
		})

		it('empty',function(){
			var data = {}
			var Csv = ack.queryObject(data).Csv()
			var titleArray = Csv.getTitleArray()
			var csvArray = Csv.toArray()
			//console.log(csvArray)
			assert.equal(csvArray.length, 0)
			if(titleArray.length!=Object.keys(data).length)throw 'queryObject did create correct title array';
		})
	})


	it('#toCsv',function(){
		var data = {firstName:['acker','nick'],lastName:['apple','acker']}
		var Csv = ack.queryObject(data).Csv('|','"')
		var csv = Csv.output()
		//console.log(csv)
		if(csv.split('\r\n').length!=data.firstName.length+1)throw 'queryObject did not convert to csv correctly';
	})
})