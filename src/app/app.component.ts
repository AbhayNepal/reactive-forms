import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {forbiddenNameValidator} from './shared/username-validator'
import { passwordValidator } from './shared/password.validator';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  formBuilder:FormBuilder = inject(FormBuilder)

  get userName(){
    return this.registrationForm.controls?.['userName']
  }

loadAPIData() {
  this.registrationForm.patchValue({
    userName:'Bruce',
    address:{
      city:'city',
      state:'state',
      postalCode:'34343'
    }
  });
}

registrationForm= this.formBuilder.group({
  userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator(/password/)]],
  password:[''],
  confirmPassword : [''],
  address: this.formBuilder.group({
    city:[''],
    state:[''],
    postalCode:['']
  })
},{validator:passwordValidator})
  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword : new FormControl(''),
  //   address: new FormGroup({
  //     city:new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode:new FormControl('')
  //   })
  // });

}
