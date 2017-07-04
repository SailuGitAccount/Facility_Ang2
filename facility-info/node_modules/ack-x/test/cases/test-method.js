"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.method',function(){
	it('#getName',function(){
		var myMethod = function myMethod(){}

		myMethod.prototype.nameTest2 = function nameTest2(){

		}

		myMethod.prototype.nameTest3 = function(){
		}

		assert.equal(ack.method(myMethod).getName(),'myMethod')
		assert.equal(ack.method(new myMethod().nameTest2).getName(),'nameTest2')
		assert.equal(ack.method(new myMethod().nameTest3).getName()==null,true)
	})

	it('#getDefinition',function(){
		var myMethod = function myMethod(a,b,c){
			var doNotInc=1
		}

		assert.equal(ack.method(myMethod).getDefinition(),'function myMethod(a,b,c)')
	})

	describe('#expect',function(){
		it('simple',function(){
			var myMethod = function(string){
				ack.method(myMethod).expect('string',string,true,String)
			}

			try{
				myMethod([])
			}catch(e){
				assert.equal(e.invalidArg.errorType, 'type')
			}

			try{
				myMethod()
			}catch(e){
				assert.equal(e.invalidArg.errorType, 'undefined')
			}
		})

		it('complex',function(){
			var myMethod = function(string, required){
				ack.method(myMethod).expect({string:{val:string,required:true,type:String}, required:required})
			}

			try{
				myMethod([])
			}catch(e){
				assert.equal(e.invalidArg.errorType, 'type')
			}

			try{
				myMethod()
			}catch(e){
				assert.equal(e.invalidArg.errorType, 'undefined')
			}

			try{
				myMethod('string')
			}catch(e){
				assert.equal(e.invalidArg.errorType, 'undefined')
			}
		})
	})
})