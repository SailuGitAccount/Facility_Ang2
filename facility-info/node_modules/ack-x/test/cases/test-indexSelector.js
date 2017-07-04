"use strict";
var ack = global.ack

describe('ack.indexSelector',function(){
	var arrSel, camServiceDataArray

	beforeEach(function(){
		camServiceDataArray = [
			{title:'Infant A', imageUrl:'/img', id:686},
			{title:'Infant B', imageUrl:'/img', id:585},
			{title:'Playground', imageUrl:'/img', id:484}
		]
		arrSel = ack.indexSelector(camServiceDataArray)
	})

	it('inits',function(){
		if(arrSel.data.selected.length!=0)
			throw 'Exected 0 selected cameras. Got '+arrSel.data.selected.length
		if(arrSel.data.indexes.length!=camServiceDataArray.length)
			throw 'Exected '+camServiceDataArray.length+' cameras. Got '+arrSel.data.indexes.length
	})

	it('#selectAll',function(){
		if(arrSel.data.selected.length!=0)
			throw 'Exected 0 selected cameras. Got '+arrSel.data.selected.length
		if(arrSel.data.indexes.length!=camServiceDataArray.length)
			throw 'Exected '+camServiceDataArray.length+' cameras. Got '+arrSel.data.indexes.length

		arrSel.selectAll()

		var camCount = camServiceDataArray.length,
			selCount = arrSel.data.selected.length

		if(camCount != selCount)
			throw 'Exected '+camCount+' selected cameras. Got '+selCount
	})

	it('#deselectAll',function(){
		arrSel.deselectAll()

		if(arrSel.data.selected.length!=0)
			throw 'Expected 0 selected cameras. Got '+arrSel.data.selected.length
	})

	it('#selectByIndex',function(){
		arrSel.selectByIndex(1)
		if(!arrSel.data.selected || arrSel.data.selected.length!=1)
			throw 'Exected one selected camera index. Got '+arrSel.data.selected.length

		arrSel.selectByIndex(0)
		if(!arrSel.data.selected || arrSel.data.selected.length!=2)
			throw 'Exected two selected cameras. Got '+arrSel.data.selected.length

		arrSel.deselectAll()
		arrSel.selectByIndex(1)
		if(!arrSel.data.states || arrSel.data.states.length!=1)
			throw 'Exected one selected camera index. Got '+arrSel.data.states.length

		arrSel.selectByIndex(0)
		if(!arrSel.data.states || arrSel.data.states.length!=2)
			throw 'Exected two selected cameras. Got '+arrSel.data.states.length
	})

	it('#deselectByIndex',function(){
		arrSel.selectByIndex(1)
		arrSel.selectByIndex(2)
		arrSel.deselectByIndex(2)
//			arrSel.deselectAll()
		if(!arrSel.data.selected || arrSel.data.selected.length!=1)
			throw 'Exected one selected cameras. Got '+arrSel.data.selected.length

		arrSel.deselectAll()
		arrSel.selectByIndex(1)
		arrSel.selectByIndex(2)
		arrSel.deselectByIndex(2)
		if(!arrSel.data.states || arrSel.data.states.length!=1)
			throw 'Exected one selected cameras. Got '+arrSel.data.states.length

	})
})
