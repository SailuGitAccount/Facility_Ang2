"use strict";

//Entry point to accessors framework
//argMap : 0:'init-function or accessor-map', 1:'extend-from or accessor-map', 2:'accessor-map'
//accessor-map: if-string:'property-name' if-array:array-of-accessor-maps if-object:{keyname:defaultMethod || keyName:property-map || keyName:simple-value-default}
//per-accessor-property-map:{preset:function-to-examine-a-set-call-to-return-what-to-actually-set, typeset:set-variable-must-be-constructor-of, default:funcForValue-or-value}
function jC(initOrStruct, parentOrStruct, struct){
	initOrStruct = jC.$(initOrStruct, parentOrStruct, struct)
	var f = function f(){//function to add more accessor definitions
		initOrStruct.jC.prop.apply(initOrStruct.jC,arguments);
		return f
	}
	return f
}

//function controller for entry point
jC.$ = function(initOrStruct, parentOrStruct, struct){
	//arg0 is struct
	if(initOrStruct!=null && !jC.isF(initOrStruct)){
		struct=initOrStruct;
		initOrStruct=null
	}

	//arg1 is struct
	if(parentOrStruct!=null && !jC.isF(parentOrStruct)){
		struct=parentOrStruct;
		parentOrStruct=null
	}

	if(initOrStruct==null)//provide constructor
		initOrStruct = function($scope){
			return jC.F.prototype.init.call(this,$scope)
		}//DONT function initOrStruct(){} AND DONT var initOrStruct = function initOrStruct(){} for IE8

	if(parentOrStruct==null)//provide parent constructor
		parentOrStruct = function(){/*jC*/}//DONT function parentOrStruct(){} AND DONT var parentOrStruct = function parentOrStruct(){} for IE8

	initOrStruct.jC = new jC.F(initOrStruct,parentOrStruct, struct)//return has jC reference

	return initOrStruct
}

//very specific and tuned function to set variables using setMethods
jC.setByAccessor = function(nameOrInitStruct,value){//params data then sets a "set" method and calls it
	if(typeof(nameOrInitStruct)=='string'){
		if(this['set'+nameOrInitStruct]){//exact key case found
			this['set'+nameOrInitStruct].call(this,value)
			return this
		}

		/* look at all keys for set function */
			var lCaseKey = nameOrInitStruct.toLowerCase()
			var mySetKey = 'set'+lCaseKey
			for(var key in this)
				if(key.length==mySetKey.length && key.toLowerCase() == mySetKey){
					this[key].call(this,value)
					return this
				}

			//may require updating as they use implied scope (perhaps 3rd argument is $scope)
			jC.F.paramdata.call(this)
			this.data[nameOrInitStruct] = value
			//this.data[lCaseKey] = value
		/* end */
	}else
		jC.each(nameOrInitStruct,jC.setByAccessor,this)//arg1 is object||array

	return this
}


//Accessors building framework
jC.F = function(C, parent , prop){//what is called to add accessors but ONCE AN OBJECT it becomes is the init and ONLY HAS 1 argument
	this.init.call(this)
	.setC(C)//set base Class aka main init method
	.setParent(parent)//inheritance

	//C.prototype = new parent//creates data scope and such cause it invokes init function
	for(var x in parent.prototype)C.prototype[x] = parent.prototype[x]

	//deprecate these, don't add methods to an object
	/*
	C.prototype.set = function(){//deprecated. Use self destructing init method
		console.log('jC: this.set is deprecated. Use self destructing method this.init or if you need this.set, have your class extend jC.Vm',arguments.callee.caller)
		return jC.setByAccessor.apply(this,arguments)
	}
	*/

	C.prototype.init = jC.F.prototype.init
	this.prop(prop)

	return this
}

jC.F.prototype.init = function($scope){//main function that creates data scope
	this.data = $scope==null ? {}:$scope
	jC.setByAccessor.call(this, $scope)//convert keys to case
	this.init = null;delete this.init//self destruct init method
	return this
}

jC.F.paramdata = function(){
	if(this.data==null)this.data={};return this
}

//assumptions: .data exists && keyName will be found in lowercase
jC.F.set = function(nameOrInitStruct,value){
	if(typeof(nameOrInitStruct)=='string'){//is arg1 name
		jC.F.paramdata.call(this)//ensure this.data is defined
		var keyName = nameOrInitStruct//nameOrInitStruct.toLowerCase()
		this.data[keyName] = value
	}else{
		jC.each(nameOrInitStruct, jC.F.set, this)//arg1 is object||array
	}
	return this
}

jC.F.get = function(name,def,stick,nullop){//!!!!TODO:This should no longer param and just get the value regardless of null or anything else
	return jC.F.param.call(this,name,def,stick,nullop)
}

jC.F.param = function(name,def,stick,nullop){
	this.data = this.data!=null ? this.data : {}//param data scope
	if(typeof(this.data[name])=='undefined')
		var r = nullop ? nullop.call(this,def,stick) : jC.F.runNullOp.call(this,name,def,stick)
	else{
		var r = this.data[name]
	}

	return r
}

//returns set closured function
jC.F.getSet = function(name,options){
	var useArray = []
		,keyName = options && options.as ? options.as : name
		,fireSet = function(v){
			jC.F.set.call(this,keyName,v);return this
		}

	if(options){
		if(options.typeset){
			useArray.push(function(v){
				if(v && v.constructor === options.typeset)
					return v

				var etn = jC.getMethodName(options.typeset)
					,oName = jC.getConName(this)
					,oOwnName = jC.getMethodName(options.original.owner)
					,msg = 'Invalid Constructor Passed to set'+options.original.name+'().'
				msg += ' ExpectTypeName:'+etn+'. GotTypeName:'+jC.getConName(v)+'. OwnerName:'+oName+'.'//details
				if(oName != oOwnName)//?original owner has changed?
					msg += ' OriginalOwnerName:'+oOwnName
				console.error(msg);
				return v
			})
		}

		if(options.preset)
			useArray.push(function(v){
				return options.preset.apply(this,arguments)
			})

		//options last action
		if(useArray.length)
			fireSet = function(v){
				for(var x=0; x < useArray.length; ++x)
					v = useArray[x].call(this,v)

				jC.F.set.call(this,keyName,v);return this
			}
	}


	return fireSet
}

//returns a get closured function
jC.F.getGet = function(name, defOrDefFunc){
	var nullop = jC.F.getNullOp(name, defOrDefFunc)
	return function(def,stick){//!!!TODO:This function shouldn't try to param, just get
		var r = jC.F.get.call(this, name, def, stick, nullop);
		return r
	}
}

//returns function to call when no default avail
jC.F.getNullOp = function(name, defOrDefFunc){
	return function(def,stick){
		return jC.F.runNullOp.call(this,name,def,stick,defOrDefFunc)
	}
}

//if name-value undefined, return value based on defaulting defintiion
jC.F.runNullOp = function(name,def,stick,dM){
	if(dM==null)
		var dm=function(){}//make dm reliable as always something
	else if(jC.isF(dM))
		var dm = dM//dm is already function
	else
		var dm = function(){return dM}//dm will return a static value

	var r = def==null ? dm.call(this) : def

	if((stick==null || stick) && (r!=null || this.data[name]!=null)){
		jC.setByAccessor.call(this,name,r)//call this['set'+name] incase it has a preset
		//this.data[name.toLowerCase()] = r//this wont call this['set'+name]
	}

	return r
}

jC.F.prototype.set = jC.F.set//?deprecated
jC.F.prototype.get = jC.F.get
jC.F.prototype.param = jC.F.param
jC.F.prototype.setC = jC.F.getSet('c')
jC.F.prototype.getC = jC.F.getGet('c')
jC.F.prototype.setParent = jC.F.getSet('parent')
jC.F.prototype.getParent = jC.F.getGet('parent')

jC.F.prototype.setter = function(name,config){
	var isSubDef = config && config.constructor==Object && config.constructor!=Array,
		method = jC.F.getSet(name, config),
		Cls = this.getC()


	name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
	Cls.prototype['set'+name] = method

	if(isSubDef && config.setAka)
		Cls.prototype[config.setAka] = method

	return this
}

jC.F.prototype.getter = function(name, defOrDefFunc){
	var isSubDef = defOrDefFunc!=null && defOrDefFunc.constructor==Object && defOrDefFunc.constructor!=Array
		,def

	if(isSubDef){
		if(defOrDefFunc['default'] != null)
			def = defOrDefFunc['default']
	}else
		def = defOrDefFunc

	var keyName = defOrDefFunc && defOrDefFunc.as ? defOrDefFunc.as : name
		,method = jC.F.getGet(keyName, def)//sequence sensative
		,Cls=this.getC()

	name = name.substring(0, 1).toUpperCase()+name.substring(1, name.length)//first letter must be capital
	Cls.prototype['get'+name] = method

	if(isSubDef && defOrDefFunc.getAka)
		Cls.prototype[defOrDefFunc.getAka] = method

	return this
}

jC.F.prototype.prop = function(naOrStOrAr, defOrDefFunc){
	switch(typeof(naOrStOrAr)){
		case 'string'://create a setter/getter just based on name alond
			defOrDefFunc = defOrDefFunc==null ? {} : defOrDefFunc

			var typ = typeof(defOrDefFunc), typArray = ['number','boolean','string'];
			for(var x=typArray.length-1; x >= 0; --x){
				if(typArray[x] == typ){
					defOrDefFunc = {
						'default':defOrDefFunc,
						original:{owner:this.getC(), name:naOrStOrAr}//record Object metadata
					}
					break
				}
			}
			//below breaks in ie8
			//if(typArray.indexOf(typ) < 0)//ensure Object/Array/Function
			//	defOrDefFunc.original = {owner:this.getC(), name:naOrStOrAr}//record Object metadata

			return this.getter(naOrStOrAr, defOrDefFunc).setter(naOrStOrAr, defOrDefFunc)//name
		case 'undefined':
		case 'function':
			return this
	}

	if(naOrStOrAr.constructor == Array){//array of definitions
		for(var x=naOrStOrAr.length-1; x >= 0; --x)
			this.prop(naOrStOrAr[x])
	}else
		jC.each(naOrStOrAr,this.prop,this)

	return this
}




if(jC.name && jC.name==='jC')//device supports function.name
	jC.getMethodName = function(method){
		return method.name
	}
else
	jC.getMethodName = function(method){
		var funcNameRegex = /function (.{1,})\(/;
		var results = (funcNameRegex).exec(method.toString())
		return (results && results.length > 1) ? results[1] : ""
	}

if({}.constructor.name)//device supports new Function().constructor.name
	jC.getConName = function(obj){
		return obj.constructor.name
	}
else
	jC.getConName = function(obj){
		return jC.getMethodName((obj).constructor)
	}

jC.isF = function(f){
	return typeof(f)=='function'
}

jC.clear = function(s){
	for(var x in s)delete s[x]
}


//loops arrays(value,index,context) or objects(name,value,context)
jC.each = function(a,meth,context){
	if(!a)return;//null abort
	if(a.constructor==Array){
		var m=(context==null) ? meth : function(v,i){meth.call(context,v,i)}
		for(var x=0;x<a.length;++x)m(a[x],x)
	}else{
		var m=(context==null) ? meth : function(n,v){meth.call(context,n,v)}
		for(var n in a)m(n,a[n])
	}return a
}








//ValueMemory: Object for case-insensitive name/value pair management
jC.Vm = function Vm(a){
	return this.init.apply(this,arguments)
}
jC(jC.Vm)//?maybe deprecated with no get/set/param methods

jC.Vm.prototype.set = jC.setByAccessor
jC.Vm.prototype.get = function(name){
	var r = jC.F.get.apply(this,arguments)
	if(r!=null)return r

	var eName = this.defined(name)
	return this.data[eName]

}

/** if name is defined, returns actual case sensative name */
jC.Vm.prototype.defined = function(name){
	if(this.data[name]!=null)return name

	//get by lowercase keyname match
	var n = name.toLowerCase()
	for(var x in this.data){
		if(x.toLowerCase()==n){
			return x
		}
	}
}
/** deprecated name alias */
jC.Vm.prototype.getExactName = jC.Vm.prototype.defined

jC.Vm.prototype.param = function(name,def){
	var r = this.get(name)
	if(r!=null)return r
	return jC.F.param.apply(this,arguments)
}

//removes all case-insensative matching keys
jC.Vm.prototype.remove = function(name){
	var n = name.toLowerCase()
	for(var x in this.data){
		if(x.toLowerCase()==n){
			this.data[x] = null;delete this.data[x];
		}
	}
	return this
}

jC.Vm.prototype.clearVars = function(){
	jC.clear(this.data);return this
}

jC.Vm.prototype.setNewData=function(value){
	this.clearVars()
	jC.F.set.call(this,value);return this
}










if(typeof(module)!='undefined'){
	module.exports=jC
	module.exports.__dirname = __dirname
}