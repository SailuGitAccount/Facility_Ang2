"use strict";
//Helps in the goal of selecting and defining states of properties on indexable data (object & arrays). The indexable data is not to be polluted by the defined properties (data and states seperate)
function IndexSelector($scope){
  this.data = $scope||{}

  this.data.indexes = this.data.indexes || []//any object will do
  this.data.selected = this.data.selected || []
  this.data.states = this.data.states || []
  return this
}

IndexSelector.prototype.isIndexSelected = function(index){
  for(var i=this.data.states.length-1; i >= 0; --i){
    if(this.data.states[i].index==index)return true
  }
  return false
}

IndexSelector.prototype.selectByIndex = function(index){
  var selected = this.data.indexes[index]
  if(selected){
    this.data.states.push(this.newStateByIndex(index))
    this.data.selected.push(selected)
  }
  return this
}

IndexSelector.prototype.deselectByIndex = function(index){
  var i,state
  for(i=this.data.states.length-1; i >= 0; --i){
    var state = this.data.states[i]
    if(state.index==index){
      this.data.selected.splice(i, 1)
      this.data.states.splice(i, 1)
      break
    }
  }
  return this
}

IndexSelector.prototype.deselectState = function(state){
  this.deselectByIndex(state.index);return this
}

IndexSelector.prototype.deselectAll = function(){
    this.data.selected.length=0
    this.data.states.length=0
  return this
}

IndexSelector.prototype.selectAll = function(){
  if(!this.data.indexes)return this

  for(var i=0; i < this.data.indexes.length; ++i){
    this.selectByIndex(i)
  }

  return this
}

//getter/setter. Getter for determining if selected. Setter to set if selected or not
IndexSelector.prototype.selectorByIndex = function(index){
  var $this = this
  return function(yesNo){
      if(yesNo!=null){
        yesNo ? $this.selectByIndex(index) : $this.deselectByIndex(index)
        return yesNo
      }

      return $this.isIndexSelected(index)
    }
}

IndexSelector.prototype.newStateByIndex = function(index){
  var state={
    data:this.data.indexes[index],
    state:{},
    index:index
  }

  return state
}

IndexSelector.prototype.selectStateByIndex = function(index){
  var i = this.data.states.length
  this.selectByIndex(index)
  return this.data.states[i].state
}

IndexSelector.prototype.deselectOldest = function(){
  this.data.selected.splice(0, 1)
  this.data.states.splice(0, 1)
  return this
}

IndexSelector.prototype.getOldestIndex = function(){
  if(this.data.states.length)return this.data.states[0].index
}

//when IndexSelector has been init with selectives but no states, blank states can be built
IndexSelector.prototype.pairSelectedToState = function(){
  for(var i=0; i < this.data.states.length; ++i){
    var state = this.data.states[i]
    this.data.selected[i] = this.data.selected[i] || this.data.indexes[state.index]
  }
  return this
}

//when IndexSelector has been init with selectives but no states, blank states can be built
IndexSelector.prototype.pairStateToSelected = function(){
  for(var i=0; i < this.data.selected.length; ++i){
    var selected = this.data.selected[i]
    this.data.states[i] = this.data.states[i] || this.newStateByIndex(i)
  }
  return this
}


module.exports = IndexSelector