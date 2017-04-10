import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { string }  from '../templates/success.component.html';
@Component({
  selector: 'success',
  template: string
})
export class SuccessComponent{
	constructor(){
		console.log('success constructor run');
	}
}	