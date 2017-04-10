import { NgModule, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ FormsModule } from '@angular/forms';
import{ HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {routing} from './app.routing';
import { FirstComponent }  from './components/first.component';
import { SecondComponent }  from './components/second.component';
import { SuccessComponent } from './components/success.component';
import { SelectComponent } from './components/select.component';
@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule, routing ],
  declarations: [ AppComponent, FirstComponent, SecondComponent, SuccessComponent,SelectComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule{

}
