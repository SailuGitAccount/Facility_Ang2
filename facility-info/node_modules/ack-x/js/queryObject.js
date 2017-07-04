"use strict";
var jXQueryObject = function jXQueryObject(object){
	this.queryObject = object
	return this
}

jXQueryObject.prototype.getNameArray = function(){
	return Object.keys(this.queryObject)
}

//{delimiter,isNameFirstRow,textQualifier,titleArray}
jXQueryObject.prototype.toCsv = function(delimOrOptions, textQualifier, titleArray){
	return this.Csv.apply(this,arguments).output()
}

jXQueryObject.prototype.Csv = function(delimOrOptions, textQualifier, titleArray){
	if(typeof(delimOrOptions)=='string')
		delimOrOptions = {delimiter:delimOrOptions}
	else if(delimOrOptions==null)
		delimOrOptions = {}

	if(textQualifier)delimOrOptions.textQualifier=textQualifier
	if(titleArray)delimOrOptions.titleArray=titleArray

	return new jXQueryObjectCsv(this.queryObject, delimOrOptions)
}








//{delimiter,isNameFirstRow,textQualifier,titleArray}
function jXQueryObjectCsv(queryObject,$scope){
	this.data = $scope || {}
	this.data.isNameFirstRow = this.data.isNameFirstRow==null ? true : this.data.isNameFirstRow
	this.data.delimiter = this.data.delimiter || ','
	this.data.queryObject = queryObject || this.data.queryObject || {}
	return this
}

jXQueryObjectCsv.prototype.getTitleArray = function(){
	if(this.data.titleArray)return this.data.titleArray
	if(this.data.isNameFirstRow)return Object.keys(this.data.queryObject)
}

jXQueryObjectCsv.prototype.output = function(){
	return this.toArray().join( this.data.lineDelim || '\r\n' )
}

jXQueryObjectCsv.prototype.toArray = function(){
	//textQualifier = textQualifier || '"'
	var columnLoop, columnCount, tempContent, newValue, newTitle,
		returnText = [],
		titleArray = this.getTitleArray(),
		nameArray = titleArray

	var options = this.data
	if(options.textQualifier && options.textQualifier.length){
		var nr = new RegExp('/'+options.textQualifier+'/', 'gi')
		var getCsvValueOf = function(val){
			if(val==null)return ''
			val = val.toString().replace(nr, options.textQualifier+options.textQualifier)
			val = options.textQualifier + val + options.textQualifier;
			return val
		}
	}else
		var getCsvValueOf = function(val){
			return val
		}

		/* figure headers */
			var tempContent=[]

			for(columnLoop=0; columnLoop < titleArray.length; ++columnLoop){
				if(typeof(titleArray[columnLoop])=='object'){
					newTitle =  titleArray[columnLoop][1]
					titleArray[columnLoop] = newTitle
					nameArray[columnLoop] = titleArray[columnLoop][0]
				}else{
					newTitle = titleArray[columnLoop]
				}
				newValue = getCsvValueOf(newTitle)
				tempContent.push(newValue)
			}
		/* end: figure headers */

		if(this.data.isNameFirstRow){
			tempContent = tempContent.join(this.data.delimiter)
			if(tempContent){
        returnText.push(tempContent);
      }
		}

		/* build CSV content */
//console.log('nameArray[0]', nameArray[0], nameArray, this.data.isNameFirstRow, this.data.queryObject)

		var rowLoop,
			columnName,
      firstColumn=this.data.queryObject[ nameArray[0] ]

    if(firstColumn){//when no data provided, firstColumn is null
			var len = firstColumn.length;//get array len from first column
  		for(rowLoop=0; rowLoop < len; ++rowLoop){
  			tempContent	= [];
  			columnCount = nameArray.length;
  			for(columnLoop=0; columnLoop < columnCount; ++columnLoop){
  				columnName = nameArray[columnLoop];
  				newValue = this.data.queryObject[columnName][rowLoop]
  				newValue = getCsvValueOf(newValue);
  				//if(isBinary(newValue))newValue = toString(newValue);
  				tempContent.push(newValue)
  			}
  			tempContent = tempContent.join(this.data.delimiter)
  			returnText.push(tempContent)
  		}
    }
	/* end */

	return returnText
}







var rtn = function(path){return new jXQueryObject(path)}
if(typeof(module)!='undefined' && module.exports){
	rtn.Class = jXQueryObject
	module.exports = rtn
}else if(typeof(jX)!='undefined'){
	jX.modules.define('queryObject',rtn)
}
