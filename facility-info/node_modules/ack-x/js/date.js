"use strict";

var moment = require('moment')

/* everything operates on a scale of 1-12 NOT 0-11 OR 1-31 NOT 0-30 ... Weeks are 1-53 */
function ackDate(date){
  this.date = ackDate.toDate(date)
  return this
}

ackDate.suffixByNumber = function(i){
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}

ackDate.dateAddDay = function(d, amount){
  amount = amount==null ? 1 : amount
    var dat = new Date(d);
    dat.setDate(dat.getDate() + amount);
    return dat;
}

ackDate.startOfDateDay = function(date){
  date = new Date(new Date(date).setHours(0))
  date = new Date(date.setMinutes(0))
  date = new Date(date.setSeconds(0))
  return new Date(date.setMilliseconds(0))
}

ackDate.endOfDateDay = function(date){
  date = new Date(new Date(date).setHours(23))
  date = new Date(date.setMinutes(59))
  date = new Date(date.setSeconds(59))
  return new Date(date.setMilliseconds(999))
}

/** will auto detect yyyy-mm-dd and convert to mm-dd-yyyy */
ackDate.dateStringToDate = function(date){
  var isZoned = date.substring(date.length-1,date.length)=='Z'
  var isFirstFourDigits = date.length>8 && !isNaN(date.substring(0, 4)) && !isZoned
  var slash = date.substring(4, 5)

  if(isFirstFourDigits && isNaN(slash)){
    var dateSplit = date.split(slash)
    var month = dateSplit[1]
    var day = dateSplit[2]
    var year = dateSplit[0]
    dateSplit[0] = month
    dateSplit[1] = day
    dateSplit[2] = year
    date = dateSplit.join(slash)
  }

  return new Date(date)
}

ackDate.dateObjectBy = function(date){
  if(date){
    switch(date.constructor){
      case ackDate:return date.date
      case Date:return date
      case String:return ackDate.dateStringToDate(date)
      default:return new Date(date)//convert string to date object
    }
  }

  return date || new Date()
}

ackDate.toDate = function(date){
  return date!=null ? ackDate.dateObjectBy(date) : null
}

//NON PROTOTYPE METHODS
ackDate.twoDigit = function(n){
  return ('0'+n).slice(-2)
}

ackDate.isDate = function(date){
  if(!date)return false

  var isRawDate = date.constructor==Date&&!isNaN(date.getTime())
  if(isRawDate)return true

  if(date.search)//string
    return date.search(/^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$/) >= 0

  return false
}

ackDate.yearByDate = function(d){
  return d.getFullYear()
}

ackDate.getMonthIndexByString = function(mon){
  return ackDate.monthLcaseNameArray.indexOf(mon.toLowerCase())
}

ackDate.monthNameArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
ackDate.monthLcaseNameArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
ackDate.monthAbbrArray = ['Jan','Feb','Mar','Apr','Ma','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
ackDate.dayNameArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
ackDate.dayAbbrArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']


ackDate.dateYearDiff = function(d0, d1){
  return Math.abs(d0.getFullYear() - d1.getFullYear())
}

/*
  PROTOTYPES
*/

ackDate.prototype.yearsFromNow = function(){
  return this.dateYearDiff( Date.now() )
}

ackDate.prototype.monthsFromNow = function(){
  return this.dateMonthDiff( Date.now() )
}

ackDate.prototype.daysFromNow = function(){
  return this.dateDayDiff( Date.now() )
}

/** see moment#fromNow  */
ackDate.prototype.fromNow = function(suffix){
  return moment(this.date).fromNow(suffix)
}

/** see moment#from  */
ackDate.prototype.from = function(d, suffix){
  return moment(d).from(this.date, suffix)
}

ackDate.prototype.now = function(){
  this.date = new Date();return this;
}

ackDate.prototype.param = function(){
  this.date = this.date||new Date();return this;
}

var stdTimezoneOffset = function() {
  var d = new Date()
  var jan = new Date(d.getFullYear(), 0, 1);
  var jul = new Date(d.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}()
ackDate.prototype.isDaylightSavings = function(){
  if(!this.date)return;
  return this.date.getTimezoneOffset() < stdTimezoneOffset;
}

//returns years.months (32.11 is 32 years and 11 months && 32.1 is 32 years 1 month)
ackDate.prototype.getAgeDisplay = function(){
  var d = this.date
    ,toDate = new Date()
    ,local = {}

  local.isValBirthdate = d!=null && ackDate.isDate(d);

  if(!local.isValBirthdate)return 0;


  local.isBorn = d < toDate
  if(local.isBorn){
    local.lesserDate = d
    local.greaterDate = toDate
  }else{
    local.lesserDate = toDate
    local.greaterDate = d
  }

  local.cYear = ackDate.yearByDate(local.greaterDate)
  local.lastBirthdate = ackDate.dateAddDay(local.lesserDate, -365)
  local.years = ackDate.dateYearDiff(local.lesserDate, local.greaterDate)
  local.months = ackDate.dateMonthDiff(local.lastBirthdate, local.greaterDate)

  if(local.months >= 12)
    local.months = local.months % 12

  local.format = 1;
  if(local.months >= 10)
    local.format = 2

  var rtnNum = local.years +'.'+ local.months

  local.result = (function(n,p){var m=Math.pow(10,p);return (Math.round(n*m)/m).toFixed(p)})(rtnNum,local.format)

  if(!local.isBorn)local.result = -local.result;

  return local.result;
}

ackDate.prototype.gt = function(date){
  date = ackDate.dateObjectBy(date)
  return this.date > date
}

ackDate.prototype.lt = function(date){
  date = ackDate.dateObjectBy(date)
  return this.date < date
}

ackDate.prototype['new'] = function(){
  return new ackDate( new Date(this.date) )
}

ackDate.prototype.isDate = function(date){
  return ackDate.isDate(date||this.date)
}

//return natural Date object
ackDate.prototype.getDate = function(){
  return this.date.getDate()
}

//sets day of month
ackDate.prototype.setDate = function(n){
  var d = this.date
  d = d.setDate(n)
  this.date = new Date(d)
  return this
}
ackDate.prototype.setDayOfMonth = ackDate.prototype.setDate


/* YEARS */
ackDate.prototype.Year = function(){
  return ack.year(this.date)
}

ackDate.prototype.year = function(){
  return ackDate.yearByDate(this.date)
}
ackDate.prototype.getYear = ackDate.prototype.year

ackDate.prototype.setYear = function(n){
  this.date.setYear(n)
  return this
}

ackDate.prototype.dayOfYear = function(){
  var d = this.date
  return Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 86400000)
}

ackDate.prototype.getNextYear = function(y){
  y = y==null ? 1 : Number(y)
  return this.year()+y
}
ackDate.prototype.nextYear = function(y){
  this.setYear( this.getNextYear(y) )
  return this
}
ackDate.prototype.getPriorYear = function(y){
  y = y==null ? 1 : Number(y)
  return this.year()-Math.abs(y)
}
ackDate.prototype.priorYear = function(y){
  this.setYear( this.getPriorYear(y) )
  return this
}
ackDate.prototype.addYear = ackDate.prototype.nextYear;
ackDate.prototype.addYears = ackDate.prototype.nextYear;

ackDate.prototype.dateYearDiff = function(date){
  date = ackDate.toDate(date)
  return ackDate.dateYearDiff(date, this.date)
}




/* MONTHS */

/** 1st 2nd 3rd of the month */
ackDate.prototype.getMonthAbbr = function(){
  return ackDate.monthAbbrArray[this.date.getMonth()]
}

ackDate.prototype.getMonthDateProperNumber = function(){
  return ackDate.suffixByNumber( this.date.getDate() )
}

ackDate.prototype.fullWeeksLeftInMonth = function(){
  var eDate = this.getLastDateOfMonth()
  var diff = this.dateDayDiff(eDate)
  return Math.floor( diff / 7 )
}

ackDate.prototype.weekInMonth = function(){
  var firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  return Math.ceil((this.date.getDate() + firstDay)/7)
}

ackDate.prototype.getMonthDayCount = function() {
    return new Date(this.year(), this.month(), 0).getDate();
}

ackDate.prototype.getMonthName = function(){
  return ackDate.monthNameArray[ this.month()-1 ]
}

ackDate.prototype.getMonthNameArray = function(){
  return ackDate.monthNameArray
}


ackDate.prototype.dateMonthDiff = function(date){
  return ackDate.dateMonthDiff(this.date, date)
}

ackDate.dateMonthDiff = function(date0, date1){
  date0 = new Date(date0);date1 = new Date(date1)
  return Math.abs( (date1.getMonth()+12*date1.getFullYear())-(date0.getMonth()+12*date0.getFullYear()) )
}

ackDate.prototype.month = function(){
  return this.date.getMonth()+1
}
ackDate.prototype.getMonth = ackDate.prototype.month

ackDate.prototype.priorMonth = function(amount){
  amount = amount || 1
  return this.nextMonth(-Math.abs(amount))
}

ackDate.prototype.nextMonth = function(amount){
  amount = amount || 1
  this.date = new Date(this.date.setMonth(this.date.getMonth()+amount))
  return this
}
ackDate.prototype.addMonths = ackDate.prototype.nextMonth

ackDate.prototype.getLastDateOfMonth = function(){
  var nd = new Date(this.date)
    ,EDate = new ackDate(nd)
  return EDate.nextMonth().gotoFirstDayOfMonth().prevDay().date
}

ackDate.prototype.setMonth = function(n){
  var d = this.date.setMonth(n-1)
  this.date = new Date(d)
  return this
}

ackDate.prototype.gotoFirstDayOfMonth = function(){
  this.prevDay( this.date.getDate()-1 );return this
}



/* DAYS */

/** always absolute number */
ackDate.prototype.dateDayDiff = function(date){
  //return Math.abs(parseInt((this.date - ackDate.toDate(date))/(24*3600*1000)))
  return Math.abs( Math.floor(( this.date - ackDate.toDate(date) ) / 86400000) )
}

ackDate.prototype.daysInMonth = function(){
  return new Date(this.year(), this.month(), 0).getDate()
}

ackDate.prototype.addDays = function(amount){
  var nd = ackDate.dateAddDay(this.date,amount)
  this.date = new Date(nd)
  return this
}
ackDate.prototype.nextDay = ackDate.prototype.addDays//multi alias

ackDate.prototype.prevDay = function(amount){
  amount = amount==null ? 1 : amount
  var d = new Date(this.date)
    ,d = d.setDate(d.getDate()-amount)
  this.date = new Date(d)
  return this
}
ackDate.prototype.priorDay = ackDate.prototype.prevDay//aka for naming consistency





/* WEEKS */

ackDate.prototype.isWeekend = function(){
  return [1,7].indexOf( this.dayOfWeek() ) >= 0
}

/** getWeekInYear */
ackDate.prototype.week = function(){
  var d = new Date(this.date)//could be number
  var onejan = new Date(d.getFullYear(),0,1)
  var nowDate = new Date(d)
  return Math.ceil((((nowDate - onejan) / 86400000) + onejan.getDay()+1)/7)
}
ackDate.prototype.getWeek = ackDate.prototype.week

ackDate.prototype.dayOfWeek = function(){
  var d = this.date
  return d.getDay()+1
}

ackDate.prototype.gotoSunday = function(){
  this.prevDay( this.dayOfWeek()-1 );return this
}
ackDate.prototype.gotoFirstDayOfWeek = ackDate.prototype.gotoSunday

ackDate.prototype.gotoMonday = function(){
  this.gotoFirstDayOfWeek().nextDay();return this
}
ackDate.prototype.gotoMondayOfWeek = ackDate.prototype.gotoMonday

ackDate.prototype.gotoFriday = function(){
  this.gotoFirstDayOfWeek().nextDay(5);return this
}
ackDate.prototype.gotoFridayOfWeek = ackDate.prototype.gotoFriday

ackDate.prototype.gotoWeek = function(week){
  var thisWk = this.week()
  this.nextWeek( week - thisWk )
  return this
}

ackDate.prototype.priorWeek = function(amount){
  amount = amount==null ? 1 : amount
  return this.nextWeek(-Math.abs(amount))
}

ackDate.prototype.nextWeek = function(amount){
  amount = amount==null ? 1 : amount
  this.nextDay(amount * 7)
  return this
}

ackDate.prototype.getDateWeekStart = function(){
  var date = this.date
    ,dw = this.dayOfWeek()-1;
  return new Date(date.setDate(date.getDate()-dw))
}

ackDate.prototype.getDateWeekStop = function(){
  var date = this.getDateWeekStart()
  date = date.setDate( date.getDate()+6 )
  return ackDate.endOfDateDay(date)
}

/** goto end of day. Just sets time to 23:59:59.999 */
ackDate.prototype.gotoEod = function(date){
  this.date = ackDate.endOfDateDay(date||this.date);return this
}
ackDate.prototype.gotoEndOfDate = ackDate.prototype.gotoEod

/** goto start of day. Just sets time to 0:0:0.0 */
ackDate.prototype.gotoSod = function(date){
  this.date = ackDate.startOfDateDay(date||this.date);return this
}
ackDate.prototype.gotoStartOfDate = ackDate.prototype.gotoSod


ackDate.prototype.FirstWeekday = function(){
  var amount = -this.dayOfWeek()+2
    ,nd = this.date
    ,nd = new Date(nd)//clone
    ,Nd = new ackDate(nd).nextDay(amount)
  return Nd
}

ackDate.prototype.getDateOfFirstWeekday = function(){
  return new Date( this.FirstWeekday().date )
}

/** method(weekNum, ackDate) */
ackDate.prototype.eachWeekInYear = function(method){
  var num = this.getWeeksInYear()
    ,year = this.year()

  for(var x=1; x <= num; ++x){
    var ExD = new ackDate(this.date).setYear(year).gotoWeek(x)
    ExD.gotoFirstDayOfWeek()
    method(x,ExD)
  }
  return this
}

ackDate.prototype.eachWeekWithMondayInYear = function(method){
  this.eachWeekInYear(function(num, ackDate){
    method(num, ackDate.gotoMondayOfWeek())
  })
  return this
}

/** returns array of date exposed objects representing each week in a year */
ackDate.prototype.getWeeksWithMondayInYearExposedArray = function(){
  var rtnArray = []
  this.eachWeekWithMondayInYear(function(weekNum, ackDate){
    rtnArray.push(ackDate)
  })
  return rtnArray
}

/** returns array of date objects representing each week in a year */
ackDate.prototype.getWeeksWithMondayInYearArray = function(){
  var rtnArray = []
  this.eachWeekWithMondayInYear(function(weekNum, ackDate){
    rtnArray.push(ackDate.date)
  })
  return rtnArray
}

ackDate.prototype.getWeeksInYear = function(y){
  y = y ? y : this.year()
  var d, isLeap;

  d = new Date(y, 0, 1);
  isLeap = new Date(y, 1, 29).getMonth() === 1;

  //check for a Jan 1 that's a Thursday or a leap year that has a
  //Wednesday jan 1. Otherwise it's 52
  return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}



/* ! TIME METHODS ! */

ackDate.prototype.setTimeByString = function(string){
  if(!this.date || !string)return this

  if(string.split){
    var parsed = eackDate.parseTimeString(string)
    this.date = this.date.setHours(parsed.hour);
    this.date = new Date(this.date)
    this.date = this.date.setMinutes(parsed.minute);
    this.date = new Date(this.date)
  }

  return this;
}

/** alters this.date and return this */
ackDate.prototype.addHours = function(n){
  if(this.date)this.date.setHours( this.date.getHours()+n );
  return this
}

/** alters this.date and return this */
ackDate.prototype.addMinutes = function(n){
  if(this.date)this.date = new Date(this.date.getTime() + n*60000)
  return this
}

ackDate.prototype.minuteOfDay = function(){
  return (60 * this.date.getHours()) + this.date.getMinutes()
}

/** alters this.date and return this */
ackDate.prototype.addSeconds = function(n){
  return this.addMilliseconds(n*1000)
}

/** alters this.date and return this */
ackDate.prototype.addMilliseconds = function(n){
  if(this.date)this.date = new Date(this.date.getTime() + n)
  return this
}

/** returns no negative numbers */
ackDate.prototype.dateHourDiff = function(date){
  return Math.abs(this.date - ackDate.dateObjectBy(date||new Date())) / 36e5;
}
ackDate.prototype.dateHoursDiff = ackDate.prototype.dateHourDiff//alias

/** Does not return negative numbers.
  @date - not required, default = new Date()
  @decimals - not required, default = false (no decimals causes decimal rounding)
*/
ackDate.prototype.dateSecondDiff = function(date, decimals){
  date = ackDate.dateObjectBy(date||new Date())
  var dif = this.date.getTime() - date.getTime()
  var Seconds_from_T1_to_T2 = dif / 1000;
  var rtn = Math.abs(Seconds_from_T1_to_T2)

  if(decimals){
    decimals = Number(decimals) && !isNaN(decimals) ? decimals:2;
    rtn = toDecimal(rtn,decimals)
  }else{
    rtn = Math.round(rtn)
  }

  return rtn
}
ackDate.prototype.dateSecondsDiff = ackDate.prototype.dateSecondDiff//alias

//no negative numbers
ackDate.prototype.dateMinuteDiff = function(date){
  date = ackDate.toDate(date||new Date())
  var hourDiff = date - this.date; //in ms
  var secDiff = hourDiff / 1000; //in s
  var minDiff = hourDiff / 60 / 1000; //in minutes
  var hDiff = hourDiff / 3600 / 1000; //in hours
  var hours = Math.floor(hDiff);
  var mins = minDiff - 60 * hours
  return Math.round( Math.abs( hours * 60 + mins ), 0);
}
ackDate.prototype.dateMinutesDiff = ackDate.prototype.dateMinuteDiff//alias



/* FORMATTING */
ackDate.prototype.getDayName = function(){
  if(!this.date)return ''
  return ackDate.dayNameArray[ this.date.getDay() ]
}

ackDate.prototype.getDayAbbr = function(){
  if(!this.date)return ''
  return ackDate.dayAbbrArray[ this.date.getDay() ]
}

/** Febuary 24th 2016 */
ackDate.prototype.mmmmdyyyy = function(){
  if(!this.date)return ''
  return this.getMonthName()+' '+this.getMonthDateProperNumber() +' '+ this.date.getFullYear()
}

/** 01:20.220 */
ackDate.prototype.hhmmssl = function(timeSep, milsecSep){
  if(!this.date)return ''
  timeSep = timeSep || ':'
  milsecSep = milsecSep || '.'
  var d = this.date
    ,h=d.getHours()
    ,m=d.getMinutes()
  m=m<10?'0'+m:m
  h = ('0'+h).slice(-2)
  var s = ('0'+d.getSeconds()).slice(-2)
  return h+timeSep+m+timeSep+s+milsecSep+d.getMilliseconds()
}

ackDate.prototype.hhmmsl = function(timeSep, milsecSep){
  if(!this.date)return ''
  var  d = this.date,
      timeSep = timeSep || ':',
      milsecSep = milsecSep || '.',
      h=d.getHours(),
      m=d.getMinutes();
  m=m<10?'0'+m:m
  h = ('0'+h).slice(-2)
  return h+timeSep+m+timeSep+d.getSeconds()+milsecSep+d.getMilliseconds()
}

ackDate.prototype.hmmtt = function(){
  if(!this.date)return ''
  var d = this.date
    ,h=d.getHours()
    ,t='AM'
    ,m=d.getMinutes();

  m=m<10?'0'+m:m;
  h=h>=12?(t='PM',h-12||12):h==0?12:h
  return h+':'+m+' '+t
}

ackDate.prototype.mmddyyyyhhmmtt = function(dateSep, spaceSep, timeSep, ttSep){
  if(!this.date)return ''
  spaceSep = spaceSep==null?' ':spaceSep;
  return this.mmddyyyy(dateSep)+ spaceSep + this.hhmmtt(timeSep, ttSep)
}

ackDate.prototype.hhmmtt = function(timeSep, ttSep){
  if(!this.date)return ''
  var d = this.date,
      timeSep = timeSep || ':',
      ttSep = ttSep==null?' ':ttSep,
      h=d.getHours(),
      t='AM',
      m=d.getMinutes();

  m=m<10?'0'+m:m;
  h=h>=12?(t='PM',h-12||12):h==0?12:h
  return ('0'+h).slice(-2) +timeSep+ m+ttSep+t
}

//yyyy-mm-dd hh:nn:ss:l
ackDate.prototype.storageFormat = function(dateSep, spaceSep, timeSep, milsecSep){
  if(!this.date)return '';
  dateSep = dateSep || '-'
  spaceSep = spaceSep || ' '
  return this.date.getFullYear() + dateSep + this.mmdd(dateSep) + spaceSep + this.hhmmssl(timeSep, milsecSep)
}

ackDate.prototype.yyyymmdd = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '' : sep
  return this.year() + sep + this.mmdd(sep)
}

ackDate.prototype.mmddyyyy = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '/' : sep
  var d = this.date
  return this.mmdd(sep)+ sep +d.getFullYear()
}

ackDate.prototype.mdyyyy = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '/' : sep
  var d = this.date
  return this.md(sep)+ sep +d.getFullYear()
}

ackDate.prototype.mdyy = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '/' : sep
  var d = this.date
  return this.md(sep)+ sep +this.yy()
}

ackDate.prototype.mmddyy = function(sep){
  if(!this.date)return '';
  var r = this.mmddyyyy()
  return r.substring(0,r.length-4)+r.substring(r.length-2,r.length)
}

ackDate.prototype.yy = function(){
  if(!this.date)return '';
  return this.date.getFullYear().toString().substring(2,4)
}

ackDate.prototype.mmdd = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '/' : sep
  var d = this.date
  return ackDate.twoDigit(d.getMonth()+1)+ sep + ackDate.twoDigit(d.getDate())
}

ackDate.prototype.md = function(sep){
  if(!this.date)return '';
  sep = sep==null ? '/' : sep
  var d = this.date
  return (d.getMonth()+1)+ sep + d.getDate()
}


var eackDate = function(date){
  return new ackDate(date)
}

eackDate.parseTimeString = function (date){
  var dDate = new Date(date);
  if(dDate!='Invalid Date'){
    return {hour:dDate.getHours(), minute:dDate.getMinutes()};
  }

  var hour, minute, tt;
  var tArray = date.split(':');
  var hour = tArray[0];

  if(tArray.length > 1){
    minute = tArray[1];
    minute = minute.split(' ');
    if(minute.length > 1){
      tt = minute[1];
      var isPm = tt.toLowerCase()=='pm'
      if(hour<=11 && isPm){
        hour = Number(hour) + 12;
      }else if(hour==12 && !isPm){
        hour = 0
      }
    }

    minute = Number(minute[0]);
  }

  return {hour:hour, minute:minute}
}


function toDecimal(n,p){var m=Math.pow(10,p);return (Math.round(n*m)/m).toFixed(p)}

eackDate.Class = ackDate
module.exports = eackDate