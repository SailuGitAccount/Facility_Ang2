"use strict";
var jc = require('./jc')
	,xMonth = require('./month')
	,ExDate = require('./date')


var Week = function Week(num){
	if(num!=null)this.setStartDate(num)
	return this
}

jc(Week, xMonth.Class)

Week.prototype.getEndDate = function(){
	if(this.endDate)return this.endDate
	this.endDate = new Date(this.getStartDate().getDate() + 6)
	return this.endDate
}

Week.prototype.setEndDate = function(date){
	if(!ExDate(date).isDate() && !isNaN(date))//just the month number?
		endDate = ExDate(new Date()).setMonth(date).getLastDateOfMonth()
	else
		this.endDate = date

	return this
}

Week.prototype.setStartDate = function(date){
	if(!isNaN(date) && date.constructor != Date)//just the month number?
		this.date = ExDate(new Date()).gotoWeek(date).date
	else
		this.date = date
	return this
}

Week.prototype.getStartDate = function(){
	if(!this.date)
		this.date = ExDate(new Date()).getDateWeekStart()
	return this.date
}

var rtn = function(path){return new Week(path)}
rtn.Class = Week
module.exports = rtn