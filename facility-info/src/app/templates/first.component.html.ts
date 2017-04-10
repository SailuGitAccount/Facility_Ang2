export const string = "<h3 style=\"color:white;background-color:#337ab7;padding:1em;\" (click)=\"fakeFill()\">Facility Information</h3>"+
"\n<p>Please fillout the following questionnaire</p>"+
"\n<form #facility_form_first=\"ngForm\" (ngSubmit)=\"submitMe()\">"+
"\n    <label>Facility Name<span>*</span></label>"+
"\n    <p>"+
"\n        <input type=\"text\" name=\"name\" [(ngModel)]=\"first.name\" #name=\"ngModel\" required>"+
"\n    </p>"+
"\n    <div *ngIf=\"submitCount && !facilityName()\" class=\"colored\">"+
"\n        Please enter name of the facility"+
"\n    </div>"+
"\n    <label> Address<span>*</span></label>"+
"\n    <input type=\"text\" name=\"street\" [(ngModel)]=\"first.street\" #street=\"ngModel\" required>"+
"\n    <div *ngIf=\"submitCount && !facilityAddress()\" class=\"colored\">"+
"\n        Please enter name of the street"+
"\n    </div>"+
"\n    <label> Apartment Number</label>"+
"\n    <input type=\"text\" name=\"apt_number\" [(ngModel)]=\"first.apt_number\" #apt_number=\"ngModel\">"+
"\n"+
"\n    <label> City<span>*</span></label>"+
"\n        <input type=\"text\" name=\"city\" [(ngModel)]=\"first.city\" #city=\"ngModel\" required>"+
"\n"+
"\n    <div *ngIf=\"submitCount && !facilityCity()\" class=\"colored\">"+
"\n        Please enter name of the city"+
"\n    </div>"+
"\n    <label> State<span>*</span></label>"+
"\n    <!-- <input type=\"text\" name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required> -->"+
"\n    <select name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required>"+
"\n          <option value=\"1\">Please select a state</option>"+
"\n          <option value=\"2\">NY</option>"+
"\n          <option value=\"3\">NJ</option>"+
"\n          <option value=\"4\">FL</option> "+
"\n         <!--  <option *ngFor=\"let c of countries\" value=\"c.name\">{{c.name}}</option> -->"+
"\n    </select>"+
"\n"+
"\n <!-- <select name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required>"+
"\n        <option *ngFor=\"let st of states\" [ngValue]=\"st.name\" [selected]=\"st.name == 'back'\">{{st.name}}</option>"+
"\n        <option *ngFor=\"let st of states1\" [ngValue]=\"st.name\">{{st.name}}</option>"+
"\n    </select>  -->"+
"\n"+
"\n"+
"\n    <div *ngIf=\"submitCount && !facilityState()\" class=\"colored\">"+
"\n        Please enter name of the state"+
"\n    </div>"+
"\n    <label> Zip Code<span>*</span></label>"+
"\n    <input type=\"text\" name=\"zip\" [(ngModel)]=\"first.zip\" #zip=\"ngModel\" placeholder=\"xxxxx\" required>"+
"\n    <div *ngIf=\"submitCount && !isZipValid()\" class=\"colored\">"+
"\n        Please enter a valid zip"+
"\n    </div>"+
"\n    <label> Phone Number<span>*</span></label>"+
"\n    <input type=\"text\" type=\"tel\" name=\"phone\" [(ngModel)]=\"first.phone\" #phone=\"ngModel\" placeholder=\"2222222222\" required>"+
"\n    <div *ngIf=\"submitCount && !isPhoneValid()\" class=\"colored\">"+
"\n            Please enter a valid phone number"+
"\n     </div>"+
"\n    <label> Email<span>*</span></label>"+
"\n    <input type=\"email\" name=\"email\" [(ngModel)]=\"first.email\" #email=\"ngModel\" required>"+
"\n    <div *ngIf=\"submitCount && !isEmailValid()\" class=\"colored\">"+
"\n            Please enter a valid email"+
"\n    </div>"+
"\n    <label>Website</label>"+
"\n    <input type=\"text\" name=\"website\" [(ngModel)]=\"first.website\" #website=\"ngModel\" pattern=\"https?://.+\" placeholder=\"http://www.google.com\">"+
"\n    <div *ngIf=\"submitCount && !isWebsiteValid()\" class=\"colored\">"+
"\n            Please enter a valid Website"+
"\n    </div>"+
"\n</form>"