import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { string }  from '../templates/first.component.html';
@Component({
  selector: 'first',
  template: string,
  providers:[Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
 
export class FirstComponent{
	@Input() submitCount:number=0;
	@Input() public first:any={}
	@Output() firstDataChange :  EventEmitter<any>=new EventEmitter();
	name:string;
	email:string;
	street:string;
	apt_number:string;
	city:string;
	state:string;
	zip:number;
	phone:string;
	website:string;
	constructor(public location:Location){
	console.log('First constructor run', this.first)
	
	}
	/*states1= [
       {id: 1, name: "NY"},
       {id: 2, name: "NJ"},
       {id: 3, name: "FL"}
    ];*/
    isZipValid(){
    	return this.first.zip.length && this.first.zip.search(/(\d{5}([\-]\d{4})?)/)>=0
    }
	isEmailValid(){
	
		return this.first.email.length && this.first.email.search(/^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/)>=0
	} 
	isPhoneValid(){
		return this.first.phone.length && this.first.phone.search(/^\D?((?!555|211|311|411|511|611|711|811|911|800|900|822|833|844|855|866|877|880|881|882|800|888|898|999)[2-9]{1}[0-9]{2})\D?\D?(\d{3})\D?(\d{4})$/)>=0 
	} 
	isWebsiteValid(){
		
		return this.first.website.search('https?://.+')>=0 || this.first.website.length==0
	}
	facilityName(){
		return this.first.name.length
	}
	facilityAddress(){
		return this.first.street.length
	}
	facilityCity(){
		return this.first.city.length
	}
	facilityState(){
		return this.first.state.length
	}
	
	fakeFill(){
		Object.assign(this.first,{
			name : 'test name',
			email : 'email@aol.com',
			website:'http://www.com',
			street:'4361',
			apt_number:'456',
			city:'coral springs',
			state:'fl',
			zip:'33066',
			phone:'2222222222'
		})
	}
	
	ngOnInit(){
		setTimeout(()=>{
			this.firstDataChange.emit(this.first)
		},0)

	}

}

