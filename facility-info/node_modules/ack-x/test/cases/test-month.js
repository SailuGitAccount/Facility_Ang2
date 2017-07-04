"use strict";
var ack = global.ack,
	assert = require('assert')

describe('ack.month',function(){
	describe('January',function(){
		var jan

		beforeEach(function(){
			jan = ack.month('January')
		})

		it('#month',function(){
			assert.equal(jan.xDate().month(),1)
		})

		it('#year',function(){
			var now = new Date()
			assert.equal(jan.xDate().year(), now.getFullYear())
		})
	})

	describe('ack.month(1).setYear(2014)',function(){
		var t14

		beforeEach(function(){
			t14 = ack.month(1)
			t14.xDate().setYear(2014)
		})

		it('#getYear',function(){
			assert.equal(t14.xDate().getYear(),2014)
		})

		it('#getWeek',function(){
			assert.equal(t14.xDate().getWeek(),1)
		})

		it('#getMonth',function(){
			assert.equal(t14.xDate().getMonth(),1)
		})

		describe('#StartDate',function(){
			beforeEach(function(){
				t14 = ack.month(1)
				t14.xDate().setYear(2014)
			})

			it('#nextDay',function(){
				var nextDay = t14.StartDate(1).nextDay(),
					lastWeek2013 = t14.StartDate(1).nextDay(-1),
					lastWeek2013 = t14.StartDate(1).setYear(2013).gotoWeek(53)
				assert.equal(nextDay.date.getDate(),2,'0.3 next day')
				assert.equal(lastWeek2013.date.getDate(),31,'0.6 previous day is 53rd week in 2013')
				assert.equal(lastWeek2013.week(),53,'0.6 previous day is 53rd week in 2013')
				assert.equal(lastWeek2013.date.getDate(),31,'0.61 week 53 week in 2013')
				assert.equal(lastWeek2013.week(),53,'0.61 week 53 week in 2013')
			})

			it('#nextWeek',function(){
				var nextWeeks = t14.StartDate(1).nextWeek(4),
					lastWeeks = t14.StartDate(1).nextWeek(-2)
				assert.equal(nextWeeks.date.getDate(),29,'0.4 next weeks')
				assert.equal(nextWeeks.week(),5,'0.4 next weeks')
				assert.equal(lastWeeks.date.getDate(),18,'0.5 last weeks')
				assert.equal(lastWeeks.week(),51,'0.5 last weeks')
			})

			it('#nextMonth',function(){
				var t14_NextMonth = t14.StartDate(1).nextMonth().date
				assert.equal(t14_NextMonth.getFullYear(),2014)
				assert.equal(t14_NextMonth.getMonth(),1,'0.9 Next Month 2/1/2014')
				assert.equal(t14_NextMonth.getDate(),1,'0.9 Next Month 2/1/2014')
			})

			it('#getDateWeekStart',function(){
				var dateWeekStart = t14.StartDate(1).getDateWeekStart()
				assert.equal(dateWeekStart.getFullYear(),2013,'0.7 DateWeekStarted 12/29/2013')
				assert.equal(dateWeekStart.getMonth(),11,'0.7 DateWeekStarted 12/29/2013')
				assert.equal(dateWeekStart.getDay(),0,'0.7 DateWeekStarted 12/29/2013')
			})

			it('#getDateOfFirstWeekday',function(){
				var t14_FirstWeekDay = t14.xDate().getDateOfFirstWeekday()
				assert.equal(t14_FirstWeekDay.getFullYear(),2013,'0.8 FirstWeekDay 12/30/2013')
				assert.equal(t14_FirstWeekDay.getMonth()+1,12,'0.8 FirstWeekDay 12/30/2013')
				assert.equal(t14_FirstWeekDay.getDay()+1,2,'0.8 FirstWeekDay 12/30/2013')
			})

			it('#getLastDateOfMonth',function(){
				var t14_LastDate = t14.StartDate(1).getLastDateOfMonth()
				assert.equal(t14_LastDate.getFullYear(),2014,'1 LastDateOfMonth 1/31/2014')
				assert.equal(t14_LastDate.getMonth(),0,'1 LastDateOfMonth 1/31/2014')
				assert.equal(t14_LastDate.getDate(),31,'1 LastDateOfMonth 1/31/2014')
			})
		})
	})
})