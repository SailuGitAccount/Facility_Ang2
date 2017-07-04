"use strict";
var jXMethod = function jXMethod(method, name){
	this.method = method;this.name = name
	return this
}

/** sets a timeout and then runs set method in milsecs */
jXMethod.prototype.runInMs = function(ms){
	setTimeout(this.method, ms);return this
}

if(jXMethod.name && jXMethod.name==='jXMethod'){//device supports function.name
	/** gets name of defined function */
	jXMethod.prototype.getName = function(){
		return this.name || (this.method.name.length ? this.method.name : null)
	}
}else{
	/** gets name of defined function */
	jXMethod.prototype.getName = function(){
		var funcNameRegex = /function\s+(.{1,})\(/;
		var results = (funcNameRegex).exec(this.method.toString())
		return this.name || ((results && results.length > 1) ? results[1] : null)
	}
}

/** returns array of argument names defined within set function */
jXMethod.prototype.getArgNameArray = function(){
	var string = this.getDefinition()
	var argDef = /\(.+\)/.exec(string)[0]
	argDef = argDef.substring(1, argDef.length)//remove (
	argDef = argDef.substring(0, argDef.length-1)//remove )
	argDef = argDef.replace(/\s|\t|\r|\n/g,'')
	return argDef.split(',')
}

/** get set functions inner definition */
jXMethod.prototype.getDefinition = function(){
	var funcNameRegex = /(.*function[^\)]+\))/;
	var results = (funcNameRegex).exec(this.method.toString())
	return (results && results.length > 1) ? results[1] : null
}

/** This is an option enhanced version of expectOne */
jXMethod.prototype.expect = function(nameOrMap, value, requiredOrType, type){
	if(nameOrMap && nameOrMap.constructor==String){
		return this.expectOne(nameOrMap, value, requiredOrType, type)
	}

	for(var key in nameOrMap){
		var define = nameOrMap[key]
		var val = define && (define.val!==null || define.value!==null)
		if(val){
			val = define.val || define.value
			this.expectOne(key, val, define.required, define.type)
		}else{
			this.expectOne(key, define, true)
		}
	}

	return this
}

/** Build argument validation for when set function is invoked.
	@name - argument-name
	@value - runtime value argument-value
	@required
	@type - requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true
*/
jXMethod.prototype.expectOne = function(name, value, requiredOrType, type){
	var isReqDefined = requiredOrType!=null && requiredOrType.constructor==Boolean
	var isRequired = isReqDefined ? requiredOrType : true
	type = type || (isReqDefined ? null : requiredOrType)

	if(isRequired && value==null){
		var methodName = this.getName()
		var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
		var argTypeMsg = methodMsg+'Argument '+name+' is required. '
		var err = new Error(argTypeMsg+' Function definition: '+this.getDefinition())
		err.invalidArg = {errorType:'undefined', name:name}
		throw err
	}

	if(type){
		if(value!=null && value.constructor!=type){
			var methodName = this.getName()
			var methodMsg = methodName ? 'The function '+methodName+' recieved an invalid argument. ' : ''
			var argTypeMsg = methodMsg+'Argument '+name+' is not of type '+type.name+'. '
			var err = new Error(argTypeMsg+'Received type: '+value.constructor.name+'. Function definition: '+this.getDefinition())
			err.invalidArg = {errorType:'type', name:name}
			throw err
		}
	}
	return this
}

/** for processing current arguments */
jXMethod.prototype.arguments = function(args){
	return new jXArgs(this, args)
}

var rtn = function(path){
	return new jXMethod(path)
}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXMethod
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('method', rtn)
}





var jXArgs = function(jXMethod, args){
	this.args=args;this.jXMethod=jXMethod;return this
}

