export const string = "<h3 style=\"color:white;background-color:#337ab7;padding:1em;\" (click)=\"fakeFill3()\">Facility Emergency Contact Information</h3>"+"\r"+
"\n<form (ngSubmit)=\"submit_second()\">"+"\r"+
"\n    <div>"+"\r"+
"\n        <label>First Name<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_first_name\" [(ngModel)]=\"second.emer_first_name\" #emer_first_name=\"ngModel\" minlength=\"3\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n     <div *ngIf=\"submitCount && !emerFirstName()\" class=\"colored\">"+"\r"+
"\n            Please enter first name"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label>Last Name<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_last_name\" [(ngModel)]=\"second.emer_last_name\" #emer_last_name=\"ngModel\" minlength=\"2\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !emerLastName()\" class=\"colored\">"+"\r"+
"\n        Please enter last name"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> Position<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_position\" [(ngModel)]=\"second.emer_position\" #emer_position=\"ngModel\" minlength=\"2\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !emerPosition()\" class=\"colored\">"+"\r"+
"\n        Please enter position"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> Email<span>*</span></label>"+"\r"+
"\n        <input type=\"email\" name=\"emer_email\" [(ngModel)]=\"second.emer_email\" #emer_email=\"ngModel\" placeholder=\"abc@gmail.com\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isEmailValid3()\" class=\"colored\">"+"\r"+
"\n            Please enter a valid email"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> Phone Number(or Mobile)<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_phone\" [(ngModel)]=\"second.emer_phone\" #emer_phone=\"ngModel\" placeholder=\"2222222222\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isPhoneValid3()\" class=\"colored\">"+"\r"+
"\n            Please enter a valid phone number"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Address<span>*</span></label>"+"\r"+
"\n    <input type=\"text\" name=\"emer_address\" [(ngModel)]=\"second.emer_address\" #emer_address=\"ngModel\" minlength=\"2\" required>"+"\r"+
"\n    <div *ngIf=\"submitCount && !emerAddress()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the street"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Apartment Number</label>"+"\r"+
"\n    <input type=\"text\" name=\"emer_apt_number\" [(ngModel)]=\"second.emer_apt_number\" #emer_apt_number=\"ngModel\">"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> City<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_city\" [(ngModel)]=\"second.emer_city\" #emer_city=\"ngModel\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n     <div *ngIf=\"submitCount && !emerCity()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the city"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> State<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_state\" [(ngModel)]=\"second.emer_state\" #emer_state=\"ngModel\" minlength=\"2\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !emerState()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the state"+"\r"+
"\n    </div>"+"\r"+
"\n    <div>"+"\r"+
"\n        <label> Zip Code<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"emer_zip\" placeholder=\"xxxxx\" [(ngModel)]=\"second.emer_zip\" #emer_zip=\"ngModel\" required>"+"\r"+
"\n    </div>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isZipValid3()\" class=\"colored\">"+"\r"+
"\n        Please enter a valid zipcode"+"\r"+
"\n    </div>"+"\r"+
"\n</form>"+"\r"+
"\n"