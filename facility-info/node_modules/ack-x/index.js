"use strict";
var ack = require('./ack-x')

ack.modules.definePath('error','./js/error')
ack.modules.definePath('number','./js/number')
ack.modules.definePath('string','./js/string')
ack.modules.definePath('binary','./js/binary')
ack.modules.definePath('base64','./js/base64')
//ack.modules.definePath('object','./js/object')
ack.modules.definePath('method','./js/method')
ack.modules.definePath('array','./js/array')
ack.modules.definePath('queryObject','./js/queryObject')
ack.modules.definePath('week','./js/week')
ack.modules.definePath('month','./js/month')
ack.modules.definePath('year','./js/year')
ack.modules.definePath('date','./js/date')
ack.modules.definePath('time','./js/time')
ack.modules.definePath('function','./js/function')

//ensure modules are loaded by a lazy require
ack.modules.getModule = function(name,path){
  if(this.$storage[name])return this.$storage[name]
  this.$storage[name] = require(path)
  return this.$storage[name]
}

module.exports = ack