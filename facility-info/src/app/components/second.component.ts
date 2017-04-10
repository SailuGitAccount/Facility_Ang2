import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { string }  from '../templates/second.component.html';
@Component({
  selector: 'second',
  template: string
})
export class SecondComponent{
	@Input() submitCount:number=0;
	@Input() public second:any={}
	@Output() secondDataChange :  EventEmitter<any>=new EventEmitter();
	emer_first_name:string; 
	emer_last_name:string; 
	emer_position:string; 
	emer_email:string; 
	emer_phone:string;
	emer_address:string;
	emer_apt_number:string;
	emer_city:string;
	emer_state:string;
	emer_zip:number;

	constructor(){
		console.log('Second constructor running')
	}
	emerFirstName(){
		return this.second.emer_first_name!=" " && this.second.emer_first_name.length
	} 
	emerLastName(){
		return this.second.emer_last_name!=" " && this.second.emer_last_name.length
	}
	emerPosition(){
		return this.second.emer_position!=" " && this.second.emer_position.length
	}
	isEmailValid3(){
		return this.second.emer_email.length && this.second.emer_email.search(/^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/)>=0
	} 
	// getStyle(){
	// 	if(!this.isEmailValid3()){
	// 		alert("hello")
	// 		return black;
	// 	}
	// }
	isPhoneValid3(){
		return this.second.emer_phone.length && this.second.emer_phone.search(/^\D?((?!555|211|311|411|511|611|711|811|911|800|900|822|833|844|855|866|877|880|881|882|800|888|898|999)[2-9]{1}[0-9]{2})\D?\D?(\d{3})\D?(\d{4})$/)>=0 
	}
	emerAddress(){
		return this.second.emer_address!=" " && this.second.emer_address.length
	}
	emerCity(){
		return this.second.emer_city!=" " && this.second.emer_city.length
	}
	emerState(){
		return this.second.emer_state!=" " && this.second.emer_state.length
	}
	isZipValid3(){
    	return this.second.emer_zip!=" " && this.second.emer_zip.length && this.second.emer_zip.search(/(\d{5}([\-]\d{4})?)/)>=0
    }

	fakeFill3(){
		Object.assign(this.second,{
			emer_first_name : 'test name',
			emer_last_name : 'GFH',
			emer_position:'HHA',
			emer_email:'coral@springs.com',
			emer_phone:'2222222222',
			emer_address:'Armstrong St',
			emer_apt_number:'678',
			emer_city:'Newyork',
			emer_state:'fl',
			emer_zip:'33066'
		})
	}	
	ngOnInit(){
		setTimeout(()=>{
			this.secondDataChange.emit(this.second)
		},0)
	}	
	submit_second(){
		if(this.second.emer_first_name.length){
			alert('all good')
		}
		else{
			console.log('fail')
		}

		console.log('user data', this.second)
	}
}