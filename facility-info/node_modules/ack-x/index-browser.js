"use strict";

var ack = require('./ack-x')

ack.error = require('./js/error.js')
ack.number = require('./js/number.js')
ack.string = require('./js/string')
ack.binary = require('./js/binary')
ack.base64 = require('./js/base64')
//ack.object = require('./js/Object')
ack.method = require('./js/method')
ack.array = require('./js/array')
ack.queryObject = require('./js/queryObject')
ack.week = require('./js/week')
ack.month = require('./js/month')
ack.year = require('./js/year')
ack.date = require('./js/date')
ack.time = require('./js/time')
/*
ack.function = require('./js/method')
*/
ack['function'] = require('./js/method');

module.exports = ack