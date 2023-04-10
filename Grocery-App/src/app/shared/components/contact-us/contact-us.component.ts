import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  Contact_us=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    message:new FormControl('',[Validators.required])
  })
  get Contact_us_data(){
    return this.Contact_us.controls
  }
  Contact_us_click(){
    console.log(this.Contact_us.value)
  }

}
