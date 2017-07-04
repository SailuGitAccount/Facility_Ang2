"use strict";

var ackDate = require('./date')

function ackTime(date){
  this.date = ackTime.toDate(date)
  return this
}

ackTime.dateObjectBy = function(date){
  if(date){
    if(date.constructor == ackTime){
      return date.date
    }

    if(date.constructor == Date)
      return date

    if(date.split){
      return stringToDate(date)
    }

    return new Date(date)//convert string to date object
  }

  return date || new Date()
}

ackTime.toDate = function(date){
  return date!=null ? ackTime.dateObjectBy(date) : null
}

function stringToDate(date){
  var dDate = new Date(date);
  if(dDate!='Invalid Date'){
    return date
  }

	var parsed = ackDate.parseTimeString(date);
	var newDate = new Date().setHours(parsed.hour);
	newDate = new Date(newDate).setMinutes(parsed.minute)
	return new Date(newDate)
}

var eackTime = function(date){
  var date = new ackTime(date).date
  return ackDate(date)
}

eackTime.Class = ackTime
module.exports = eackTime