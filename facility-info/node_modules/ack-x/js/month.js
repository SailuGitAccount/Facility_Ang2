"use strict";
var xDate = require('./date')

var xMonth = function xMonth(num){
	if(num!=null){
		this.setStartDate(num)
	}
	return this
}

xMonth.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

xMonth.getMonthIndexByString = function(mon){
	return xMonth.monthLcaseNameArray.indexOf(mon.toLowerCase())
}

xMonth.prototype.setStartDate = function(date){
	var jDate = xDate()
	if(!jDate.isDate(date)){
		var num = Number(date)

		if(!isNaN(num)){//just the month number?
			date = xDate().now().setDate(1).setMonth(date).date
		}else{
			var i = xMonth.getMonthIndexByString(date)
			date = xDate(new Date()).setDate(1).setMonth(i+1).date
		}
	}
	this.date = date
	return this
}

xMonth.prototype.StartDate = function(isClone){
	var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
	return xDate(startDate)
}

xMonth.prototype.xDate = function(){
	return xDate(this.getStartDate())
}

xMonth.prototype.getStartDate = function(){
	if(this.date)return this.date
	this.date = new Date(new Date().setDate(1))
	return this
}

xMonth.prototype.setEndDate = function(date){
	if(!xDate(v).isDate() && !isNaN(v))//just the month number?
		this.endDate = xDate(new Date()).setMonth(date).getLastDateOfMonth()
	else
		this.endDate = date

	return this
}

xMonth.prototype.getEndDate = function(){
	if(this.endDate)return this.endDate
	var d = '12/31/'+this.getYear()
	this.endDate = new Date(d)
	return this.endDate
}



var rtn = function(num){
	return new xMonth(num)
}
rtn.Class = xMonth
module.exports = rtn