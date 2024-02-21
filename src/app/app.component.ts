import { Component, OnInit, inject, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username-validator'
import { passwordValidator } from './shared/password.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  formBuilder: FormBuilder = inject(FormBuilder)
  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm.controls?.['userName']
  }

  get email() {
    return this.registrationForm.controls?.['email']
  }
  get alternateEmails() {
    return this.registrationForm.controls?.['alternateEmails'] as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.formBuilder.control(''));
  }

  removeAlternativeEmail() {
    this.alternateEmails.removeAt(this.alternateEmails.length-1)
    }


  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [false],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.formBuilder.array([])
    }, { validator: passwordValidator });
    this.registrationForm.controls?.['subscribe'].valueChanges
      .subscribe(checkedvalue => {
        const email = this.registrationForm.controls?.['email'];
        if (checkedvalue) {
          email.setValidators(Validators.required)
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      })
  }

  loadAPIData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
      address: {
        city: 'city',
        state: 'state',
        postalCode: '34343'
      }
    });
  }


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
