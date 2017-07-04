"use strict";
var jXBinary = function jXBinary(binary){
	this.binary = binary
	return this
}

jXBinary.prototype.is = function(){
	return /^[01]+$/.test(this.binary)
}


var rtn = function(path){return new jXBinary(path)}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXBinary
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('binary', rtn)
}
