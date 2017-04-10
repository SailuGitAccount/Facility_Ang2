import 'rxjs/add/operator/toPromise';
import { Component, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Component, bind, provide, AfterViewInit, ViewChild, ViewContainerRef} from '@angular/core';
@Component({
  selector: 'my-app',
   
 
  template: `
  <select ui-select
        [options]="options"
        [(ngModel)]="alertType"
        [defaultValue]="'Select an alert Type'" #mySelect>
</select>
{{alertType}}
  <div class="container">
    <div class="row">
     <div class="col-sm-8 col-sm-offset-2">
        <div *ngIf="step<=1">
          <h1 class="text-center" >Facility Information Worksheet</h1>
          <p style="color:red;">*Required</p>
        </div>  
        <div *ngIf="!step">
         <first [(first)]="firstData" [submitCount]="submitCounts.one"></first>
        </div>
        <div *ngIf="step==1">
         <second [(second)]="secondData" [submitCount]="submitCounts.two"></second>
        </div>
        <div>
         <button class="btn btn-primary" (click)="step=step-1" *ngIf="step==1">BACK</button>
         <button id="nextButton" class="btn btn-primary" (click)="tryContinue()" *ngIf="step==0">NEXT</button>
         <button class="btn btn-primary" *ngIf="step==1" (click)="submitForm()">SUBMIT</button> 
        </div> 
        <div *ngIf="response1==200 && step>1">
         <success></success>
        </div>
        <div *ngIf="error">
          <h1 class="text-center" style="color:white;background-color:#337ab7;padding:1em;">ERROR {{error.message || error.status || 'Occurred'}} - {{error.status}}</h1>
        </div>
      </div>
    </div>
  </div> 
  <router-outlet></router-outlet>`,
providers:[Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements AfterViewInit{
  @ViewChild('mySelect', {read: ViewContainerRef}) mySelect;
options = [
    {id: 1, value: "item-1", selected: false},
    {id: 2, value: "item-2", selected: true},
    {id: 3, value: "item-3", selected: false}
];
alertType: any;

 ngAfterViewInit() {
    this.alertType = this.mySelect.element.nativeElement.value;
  } 
    public firstData:any={
        name : '',
        email : '',
        website:'',
        street:'',
        apt_number:'',
        city:'',
        state:'',
        zip:'',
        phone:''
    }
    public secondData:any={
       emer_first_name : ' ',
        emer_last_name : ' ',
        emer_position:' ',
        emer_email:' ',
        emer_phone:' ',
        emer_address:' ',
        emer_apt_number:'',
        emer_city:'',
        emer_state:' ',
        emer_zip:' '
      }
    public validity:any
    public step:number=0
    public error:number
    public err:boolean=false
    public response1:any
    public userdata:any
    public submitCounts={one:0, two:0, three:0}

    extractData(res: Response) {
      let body = res.json()
      console.log('body',body)
      return body.data || { }
    }


    constructor(private http: Http){
      console.log('app constructor running')
      this.firstData.state="hello"
    }
    isFormOneValid(){
      if(this.firstData.website.length!=0){
        this.validity=this.firstData.name.length && this.firstData.email.length && this.firstData.street.length && this.firstData.city.length && this.firstData.state.length && this.firstData.zip.length && this.firstData.phone.length && this.firstData.email.search(/^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/)>=0 && this.firstData.website.search('https?://.+')>=0 && this.firstData.phone.search(/^\D?((?!555|211|311|411|511|611|711|811|911|800|900|822|833|844|855|866|877|880|881|882|800|888|898|999)[2-9]{1}[0-9]{2})\D?\D?(\d{3})\D?(\d{4})$/)>=0 && this.firstData.zip.search(/(\d{5}([\-]\d{4})?)/)>=0
      }
      else{
        this.validity=this.firstData.name.length && this.firstData.email.length && this.firstData.street.length && this.firstData.city.length && this.firstData.state.length && this.firstData.zip.length && this.firstData.phone.length && this.firstData.email.search(/^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/)>=0 && this.firstData.phone.search(/^\D?((?!555|211|311|411|511|611|711|811|911|800|900|822|833|844|855|866|877|880|881|882|800|888|898|999)[2-9]{1}[0-9]{2})\D?\D?(\d{3})\D?(\d{4})$/)>=0 && this.firstData.zip.search(/(\d{5}([\-]\d{4})?)/)>=0
      }
    return this.validity
    }
    isFormThreeValid(){
      return this.secondData.emer_first_name.length && this.secondData.emer_last_name.length && this.secondData.emer_last_name.length && this.secondData.emer_position.length && this.secondData.emer_email.length && this.secondData.emer_phone.length && this.secondData.emer_address.length && this.secondData.emer_city.length && this.secondData.emer_state.length && this.secondData.emer_zip.length && this.secondData.emer_email.search(/^[\w-]+(?:.[\w-]+)*@(?:[\w-]+.)+[a-zA-Z]{2,7}$/)>=0 && this.secondData.emer_phone.search(/^\D?((?!555|211|311|411|511|611|711|811|911|800|900|822|833|844|855|866|877|880|881|882|800|888|898|999)[2-9]{1}[0-9]{2})\D?\D?(\d{3})\D?(\d{4})$/)>=0 && this.secondData.emer_zip.search(/(\d{5}([\-]\d{4})?)/)>=0
    }
    errMessages(){
      switch(this.step){
        case 0:++this.submitCounts.one;break;
        case 1:++this.submitCounts.two;break;
        case 2:++this.submitCounts.three;break;
      }
      console.log('this.submitCounts', this.submitCounts)
    }
     
    tryContinue(){
      this.errMessages()

      if(!this.isFormOneValid()){
        alert('Please fill all the required input fields and click Next')
        return false
      }
      this.step = this.step+1
    }
     
    submitForm(http: Http){
        if(!this.isFormThreeValid()){
        alert('Please fill all the required input fields and click Submit')
        this.errMessages()
        return false
      }
      else{
        this.step = this.step+1
        this.userdata={
              "facility_name":  this.firstData.name,
              "address": this.firstData.street,
              "address2": this.firstData.apt_number,
              "city": this.firstData.city,
              "state": this.firstData.state,
              "zip": this.firstData.zip,
              "phone": this.firstData.phone,
              "website": this.firstData.website,
              "email": this.firstData.email,
              "admin_id":1,
              "emergency_contacts": [
                          {
                          "address": this.secondData.emer_address,
                          "address2":  this.secondData.emer_apt_number,
                          "city": this.secondData.emer_city,
                          "state": this.secondData.emer_state,
                          "zip": this.secondData.emer_zip,
                          "first_name": this.secondData.emer_first_name,
                          "last_name": this.secondData.emer_last_name,
                          "email":  this.secondData.emer_email,
                          "phone":  this.secondData.emer_phone,
                          "position":  this.secondData.emer_position
                          }  
              ]
      }
      console.log('state',this.firstData.state) 
    console.log('Final Data',this.userdata) 
   this.http.post('http://www.google.com')
       .toPromise()
       .then(result=>{
        // console.log('status', result.status, result['_body'])
         console.log("parsed", JSON.parse(result['_body']))
          this.response1=result.status
          console.log('response1',this.response1)
          return this.response1
       })
       .catch(e=>{
         console.log('failed', e)
         this.error = e
       }) 
    }
}

