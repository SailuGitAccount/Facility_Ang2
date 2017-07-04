"use strict";
var jXBase64 = function jXBase64(base64){
	this.base64 = base64
	return this
}

jXBase64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

jXBase64.prototype.toString = function(e){
	var e = this.base64.replace(/[^A-Za-z0-9\+\/\=]/g,"");
	var t="";var n,r,i;var s,o,u,a;var f=0;
	while(f<e.length){
		s=jXBase64._keyStr.indexOf(e.charAt(f++));
		o=jXBase64._keyStr.indexOf(e.charAt(f++));
		u=jXBase64._keyStr.indexOf(e.charAt(f++));
		a=jXBase64._keyStr.indexOf(e.charAt(f++));
		n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;
		t=t+String.fromCharCode(n);
		if(u!=64){t=t+String.fromCharCode(r)}
		if(a!=64){t=t+String.fromCharCode(i)}
	}
	t = this._utf8_decode(t);
	return t
}

jXBase64.prototype._utf8_decode = function(e){
	var t="";var n=0;var r=0,c2=0;
	while(n<e.length){
		r=e.charCodeAt(n);
		if(r<128){
			t+=String.fromCharCode(r);n++
		}else if(r>191&&r<224){
			c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2
		}else{
			c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);
			t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3
		}
	}
	return t
}

var rtn = function(path){return new jXBase64(path)}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXBase64
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('base64', rtn)
}
