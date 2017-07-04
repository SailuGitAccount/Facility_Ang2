# ack-x
Extra functional library to objectify & compartmentalize variables into wrappers that make invokation & injection processes, lighter & easier to implement.

### Table of Contents

- [The ack Function](#the-ack-function)
- [ack.date](#ackdate)
- [ack.array](#ackarray)
- [ack.method](#ackmethod)
- [ack.error](#ackerror)
- [ack.number](#acknumber)
- [ack.object](#ackobject)
- [ack.string](#ackstring)
- [More Examples](#more-examples)

## The ack Function
Access to short-hand methods that can function with most all variable types
```javascript
var ack = require('ack-x')

ack( someVariable )
```

getBoolean - reduces variable to a true/false
```javascript
ack('y').getBoolean() == true
```

isBooleanLike
```javascript
ack('y').isBooleanLike == true
```

nullsToEmptyString
```javascript
ack({x:null, y:null}).nullsToEmptyString == {x:'', y:''}
```

getBit - returns only 0 or 1. Negative numbers will be 0
```javascript
ack(-2).getBit() == 0
```

stringify - JSON.stringify with default spacing=2
```javascript
ack({x:22, y:33}).stringify() == {
  "x":22,
  "y":33
}
```

get - case insensative object key search
```javascript
ack({XxX:22}).get('xXx') == 22
```

byName - Returns another ack class object based on case insensative object key search
```javascript
ack({XxX:{YyY:33}}).byName('xXx').get('yYy') == 33
```


## ack.date
```javascript
var aDate = ack.date().now()

aDate.addYears(5).yearsFromNow() == 5
aDate.addMonths(5).monthsFromNow() == 5
aDate.addDays(5).daysFromNow() == 5
```

## ack.array
```javascript
var a = []

/**
  Intended for high performance by looping an array only once but performing multiple actions.
  Run multiple functions for each iteration of an array.

  Example: array.each(countTeacher, countChild) instead of two loops array.each(countTeacher) + array.each(countChild)
*/
ack.array(a).each(method0, method1, method2, method3)
```

reduce array down to only distinct items
- @method - optional, returned value is used to determine distinctness

```javascript
ack.array(a).distinct(method)
```

pivets array of objects to object of arrays
```javascript
ack.array(a).objectify()
```

append an array's items onto the end of this array
```javascript
ack.array(a).appendArray(array)
```

prepend an array's items onto the front of this array
```javascript
ack.array(a).prependArray(array)
```

ads an array all up
- @method - optional. Returned value is used to sum

```javascript
ack.array(a).sum(method)
```

break an array into buckets of arrays
- @isIndexValue=false - when true, buckets of arrays will be corresponding index values back to original array
- @grouptype='sequence' - ('sequence'||'struct') . 'sequence', array of arrays = [ [],[],[] ] . 'struct' = {value0:[buckets...], value1:[buckets...]}

```javascript
ack.array(a).group(method, isIndexValue, grouptype)
```

## ack.method
Holds a function in memory and offers convenient methods to invoke set method

### Examples

sets a timeout and then runs set method in milsecs
```javascript
var f = function(){}

ack.method(f).runInMs(ms)
```

gets name of defined function
```javascript
ack.method(f).getName()
```

returns array of argument names defined within set function
```javascript
ack.method(f).getArgNameArray()
```

get set functions inner definition
```javascript
ack.method(f).getDefinition()
```

This is an option enhanced version of expectOne
```javascript
ack.method(f).expect(nameOrMap, value, requiredOrType, type)
```

Build argument validation for when set function is invoked.
- @name - argument-name
- @value - runtime value argument-value
- @required
- @type - requiredOrType - true/false or constructor validation. When constructor validatation, required is true. When undefined, required is true

```javascript
ack.method(f).expectOne(name, value, requiredOrType, type)
```

## ack.error
great for standardizing error control

returns all object keys of an error which is takes extra steps
```javascript
var e = new Error()

ack.error(e).getKeys()
```

converts error.stack into array via stack.split(' at ')
```javascript
ack.error(e).getStackArray(amount)
```

dig out just the stack trace from error
```javascript
ack.error(e).getTraceArray(amount)
```

dig out only just the first trace of errors stack trace
```javascript
ack.error(e).getFirstTrace(amount)
```

```javascript
ack.error(e).setStackArray(stackArray)
```

analyzes stack to remove 1st trace (leaves error message in stack). Essentially calls .splice(1,1) on stack array
```javascript
ack.error(e).cutFirstTrace()
```

attempt to extract a line number from the error
```javascript
ack.error(e).getLineNum()
```

attempt to extract a file path from the error
```javascript
ack.error(e).getFilePath()
```

attempt to extract the error's name
```javascript
ack.error(e).getName()
```

attempt to extract the named function or code that is running
```javascript
ack.error(e).getFailingObjectName()
```

get a message from the error even if it has no message
```javascript
ack.error(e).getMessage()
```

attempt to extract the error's type
```javascript
ack.error(e).getType()
```

attempt to compare error with another error or another type of an error
```javascript
ack.error(e).isType(type)
```

TYPES OF ERRORS, use these errors to standardized error flow
```javascript
ack.error().types.notFound( message )
ack.error().types.localNetworkRequired( message )
ack.error().types.unauthorized( message )
ack.error().types.badRequest( message )
ack.error().types.methodNotAllowed( message )
```

TYPES OF ERRORS, Object Details
```javascript
ack.error().types.NotFound(message){
  this.status = 404;
  this.code = "not_found";
  this.message = message || "Could Not Find Requested Resource";
}

ack.error().types.LocalNetworkRequired(message){
  this.status = 403;
  this.code = "local_network_required";
  this.message = message || "Local Network Connection Required";
}

ack.error().types.Unauthorized = function(message){
  this.status = 401;
  this.code = "credentials_required";
  this.message = message || "No authorization token was found";
}

ack.error().types.BadRequest = function(message){
  this.status = 400;
  this.code = "bad_request";
  this.message = message || "Bad Request";
}

ack.error().types.MethodNotAllowed = function(message){
  this.status = 405;
  this.code = "method_not_allowed";
  this.message = message || "Method Not Allowed";
}
```

## ack.number
Convenient methods to handle numbers

decimalFormat
- @p - decimal places
```javascript
var n = 10

ack.number(n).decimalFormat(p)
```

convert set number into how many minutes into a date. Ex: 60 = new Date('2016-01-16 1:00:00.0')
- @options - {}
- @options.date - default=new Date()

```javascript
ack.number(n).asMinutesToDateTime(options)
```

convert set number into how many minutes into a string date. Ex: 60 = 1:00 AM')
- @options = {}
- @options.timeDelim - default=':'
- @optiosn.dayPeriodDelim - default=' '

```javascript
ack.number(n).asMinutesToTime(options)
```

## ack.object

forEach
- @method(item, index, object)

```javascript
var o = {}

ack.object(o).forEach(method)
```

this.object will be the map result
- @method(item, index, object)

```javascript
ack.object(o).map(method)
```

tests Object for circular references
```javascript
ack.object(o).isCyclic()
```

like JSON.stringify but converts all to cookie definition
```javascript
ack.object(o).toCookieString()
```

## ack.string

test string against email regX
```javascript
var s = 'String'
ack.string(s).isEmail()
```

Node.js doesnt have .repeat as of 2/11/15
```javascript
ack.string(s).repeat(num)
```

escapes html brackets
```javascript
ack.string(s).htmlFormat()
```

string becomes really long
```javascript
ack.string(s).toBase64()
```

convert string to something more safely portable
```javascript
ack.string(s)._utf8_encode()
```

## More Examples

## Simple Example of Variable Exposing
```javascript
//get date object for the first hour, minute and second of the first day of month
var aDate = require('ack-x').date().now()
var startOfDate = aDate.gotoFirstDayOfMonth().gotoStartOfDate()
var monthStartsExactlyAt = startOfDate.date

console.log( monthStartsExactlyAt )
```


### Complex Example of Variable Exposing
In the following example, many modules are used to manipulate variables
```javascript
var ack = require('ack-x')
var xDate = ack.date().now()//expose date as now

ack.promise(
  xDate.getNextYear(),//promise val0 is next year as number
  xDate.nextYear(2).year(),//promise val1 is the year as number, in two years
  xDate.getNextYear(3)//promise val2 is the year as number, in two years
)
.then(function(y0, y1, y2){
  return y0 < y1 && y1 < y2
})
.if(false, function(){
  return 'Time is going in reverse'
})
.if(true, function(){
  return 'Time is going in correct direction'
})
.then( ack.string )//The promise string value, is injected into the string variable exposer
.call('toBase64')//The exposed string variable is casted to base64
.then( console.log )//log results of base64
.catch(function(e){
  console.log(e)
})
```
