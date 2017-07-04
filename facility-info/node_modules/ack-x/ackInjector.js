"use strict";

var ackInjector = function ackInjector($scope, $storage){
  this.$storage = $storage || {}
  this.$scope = $scope || this
  return this
}

ackInjector.prototype.define = function(name, $module, initInjectArray){
  var $this = this
  var method = function(){
    return $this.LoadModule(name, $module, arguments, initInjectArray)
  }

  this.$scope[name] = method//this.functionName . example: ack.mail()
  return this
}

ackInjector.prototype.definePath = function(name,path,initInjectArray){
  var $this = this
  var fetcher = function(){
    var $module = $this.getModule(name, path)
    return $this.LoadModule(name, $module, arguments, initInjectArray)
  }

  this.$scope[name] = fetcher//this.functionName . example: ack.mail()
  return this
}

ackInjector.prototype.LoadModule = function(name, $module, $args, injectArray){
  if($module.constructor!=Function){
    return $module
  }

  if(!injectArray){
    var r = $module.apply($module, $args)//no dependencies
    return r
  }

  var isInjectInit = typeof(injectArray)=='function',
    init = isInjectInit ? injectArray : injectArray[injectArray.length-1],
    args = []

  if(!isInjectInit){
    var tar
    for(var i=0; i < injectArray.length-1; ++i){//all but last, last was init
      switch(injectArray[i].toLowerCase()){
        case '$arg0':
          tar = $args[0]
          break;

        case '$injector':
          tar = this.$scope//this
          break;

        case '$module':
          tar = $module
          break;

        case '$args':
          tar = Array.prototype.slice.call($args)
          break;


        default:
          if(this.$scope[injectArray[i]]!=null){
            tar = this.$scope[injectArray[i]]
          }else if(this.$storage[injectArray[i]] != null){
            tar = this.$storage[injectArray[i]]
          }
      }
      args.push(tar)
    }
  }

  args = args.concat(Array.prototype.slice.call($args))

  if(typeof(init)=='string'){//last arg is module to return
    switch(init){
      case '$module':
        return $module.apply($module, args)
        break;

      default:
        throw 'should not get here. Last argument of injector was not a function NOR "$module"';
        return $module.apply(this.$scope[init], args)
    }
  }
  return init.apply(init, args)
}

ackInjector.prototype.getModule = function(name,path){
  if(this.$storage[name])return this.$storage[name]
  throw new Error('Module not defined ('+name+'). Valid modules: "'+ Object.keys(this.$storage).join(',')+'"')
}

ackInjector.prototype.newModule = function(name,path,arg){
  var Module = this.getModule(name,path)
  return new Module(arg)
}


module.exports = ackInjector