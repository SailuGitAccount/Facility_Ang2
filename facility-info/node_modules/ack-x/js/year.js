"use strict";
var xDate = require('./date')

var ackYear = function ackYear(yyyy){
	if(yyyy!=null)this.setStartDate(yyyy)
	return this
}

ackYear.prototype.setStartDate = function(date){
	var isObject = typeof(date) == 'object',
		isYearString = !isObject && !isNaN(Number(date)),
		isYear = isYearString || (!xDate(date).isDate() && !isNaN(date))

	if(isYear){//just the year number?
		date = new Date(new Date('1/1/2011').setYear(date))
	}

	this.date = date
	return this
}

ackYear.prototype.getStartDate = function(){
	if(this.date)return this.date
	var d = '1/1/'+xDate(new Date()).year()
	this.date = new Date(d)
	return this.date
}

ackYear.prototype.setEndDate = function(date){
	if(!xDate(date).isDate() && !isNaN(date))//just the year number?
		this.date = new Date('12/31/'+date)
	else
		this.date = date
	return this
}

ackYear.prototype.getEndDate = function(){
	if(this.endDate)return this.endDate
	var d = '12/31/'+this.getYear()
	this.endDate = new Date(d)
	return this.endDate
}

ackYear.prototype.StartDate = function(isClone){
	var startDate = !isClone ?  this.getStartDate() : this.getStartDate()
	return xDate(startDate)
}

ackYear.prototype.xDate = function(){
	return xDate(this.getStartDate())
}

ackYear.prototype.month = function(){
	return this.StartDate().month()
}
ackYear.prototype.getMonth = ackYear.prototype.month//deprecated

ackYear.prototype.week = function(){
	return this.StartDate().week()
}
ackYear.prototype.getWeek = ackYear.prototype.week//deprecated

//?deprecated (duplicate of Date class)
ackYear.prototype.getYear = function(){
	var d = this.getStartDate()
	return xDate(d).year()
}
ackYear.prototype.year = ackYear.prototype.getYear

//gets startdate and changes the year
ackYear.prototype.setYear = function(yyyy){
	var ExYy = xDate(yyyy)
	if(isNaN(yyyy) && ExYy.isDate())
		yyyy = ExYy.year()

	var date = this.getStartDate()
	date = new Date( date.setYear(yyyy) )
	this.setStartDate(date)

	return this
}

ackYear.prototype.getDateOfLastWeekday = function(){
	var d = getStartDate()
		,addAmount = -xDate(d).dayOfWeek()+6
		,dateA = new Date( d.setDate(d.getDate()+addAmount) )

	dateA = new Date(dateA.setHours(23))
	dateA = new Date(dateA.setMinutes(59))
	dateA = new Date(dateA.setSeconds(59))

	return dateA
}






var rtn = function(path){
	return new ackYear(path)
}
rtn.Class = ackYear
module.exports = rtn