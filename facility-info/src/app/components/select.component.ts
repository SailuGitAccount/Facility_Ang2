import {Component, Input} from '@angular/core';

@Component({
  selector: '[ui-select]',
  template: `
    <option *ngIf="defaultValue" value="-1">{{defaultValue}}</option>
    <option *ngFor="let option of options" [value]="option.id" [selected]="option.selected" >{{option.value}}</option>
  `
})
export class SelectComponent {
  @Input() options: any;
  @Input() defaultValue: string;
}