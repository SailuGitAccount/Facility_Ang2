export const string = "<h3 style=\"color:white;background-color:#337ab7;padding:1em;\" (click)=\"fakeFill()\">Facility Information$$$$</h3>"+"\r"+
"\n<p>Please fillout the following questionnaire</p>"+"\r"+
"\n<form #facility_form_first=\"ngForm\" (ngSubmit)=\"submitMe()\">"+"\r"+
"\n    <label>Facility Name<span>*</span></label>"+"\r"+
"\n    <p>"+"\r"+
"\n        <input type=\"text\" name=\"name\" [(ngModel)]=\"first.name\" #name=\"ngModel\" required>"+"\r"+
"\n    </p>"+"\r"+
"\n    <div *ngIf=\"submitCount && !facilityName()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the facility"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Address<span>*</span></label>"+"\r"+
"\n    <input type=\"text\" name=\"street\" [(ngModel)]=\"first.street\" #street=\"ngModel\" required>"+"\r"+
"\n    <div *ngIf=\"submitCount && !facilityAddress()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the street"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Apartment Number</label>"+"\r"+
"\n    <input type=\"text\" name=\"apt_number\" [(ngModel)]=\"first.apt_number\" #apt_number=\"ngModel\">"+"\r"+
"\n"+"\r"+
"\n    <label> City<span>*</span></label>"+"\r"+
"\n        <input type=\"text\" name=\"city\" [(ngModel)]=\"first.city\" #city=\"ngModel\" required>"+"\r"+
"\n"+"\r"+
"\n    <div *ngIf=\"submitCount && !facilityCity()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the city"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> State<span>*</span></label>"+"\r"+
"\n    <!-- <input type=\"text\" name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required> -->"+"\r"+
"\n    <select name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required>"+"\r"+
"\n          <option value=\"1\">Please select a state</option>"+"\r"+
"\n          <option value=\"2\">NY</option>"+"\r"+
"\n          <option value=\"3\">NJ</option>"+"\r"+
"\n          <option value=\"4\">FL</option> "+"\r"+
"\n         <!--  <option *ngFor=\"let c of countries\" value=\"c.name\">{{c.name}}</option> -->"+"\r"+
"\n    </select>"+"\r"+
"\n"+"\r"+
"\n <!-- <select name=\"state\" [(ngModel)]=\"first.state\" #state=\"ngModel\" required>"+"\r"+
"\n        <option *ngFor=\"let st of states\" [ngValue]=\"st.name\" [selected]=\"st.name == 'back'\">{{st.name}}</option>"+"\r"+
"\n        <option *ngFor=\"let st of states1\" [ngValue]=\"st.name\">{{st.name}}</option>"+"\r"+
"\n    </select>  -->"+"\r"+
"\n"+"\r"+
"\n"+"\r"+
"\n    <div *ngIf=\"submitCount && !facilityState()\" class=\"colored\">"+"\r"+
"\n        Please enter name of the state"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Zip Code<span>*</span></label>"+"\r"+
"\n    <input type=\"text\" name=\"zip\" [(ngModel)]=\"first.zip\" #zip=\"ngModel\" placeholder=\"xxxxx\" required>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isZipValid()\" class=\"colored\">"+"\r"+
"\n        Please enter a valid zip"+"\r"+
"\n    </div>"+"\r"+
"\n    <label> Phone Number<span>*</span></label>"+"\r"+
"\n    <input type=\"text\" type=\"tel\" name=\"phone\" [(ngModel)]=\"first.phone\" #phone=\"ngModel\" placeholder=\"2222222222\" required>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isPhoneValid()\" class=\"colored\">"+"\r"+
"\n            Please enter a valid phone number"+"\r"+
"\n     </div>"+"\r"+
"\n    <label> Email<span>*</span></label>"+"\r"+
"\n    <input type=\"email\" name=\"email\" [(ngModel)]=\"first.email\" #email=\"ngModel\" required>"+"\r"+
"\n    <div *ngIf=\"submitCount && !isEmailValid()\" class=\"colored\">"+"\r"+
"\n            Please enter a valid email"+"\r"+
"\n    </div>"+"\r"+
"\n    <label>Website</label>"+"\r"+
"\n    <input type=\"text\" name=\"website\" [(ngModel)]=\"first.website\" #website=\"ngModel\" pattern=\"https?://.+\" placeholder=\"http://www.google.com\">"+"\r"+
"\n    <div *ngIf=\"submitCount && !isWebsiteValid()\" class=\"colored\">"+"\r"+
"\n            Please enter a valid Website"+"\r"+
"\n    </div>"+"\r"+
"\n</form>"