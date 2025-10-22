import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // userForm!: FormGroup; 
  username = '';
  password = '';
  errorMessage='';
  configPassword = environment.password;  

  constructor(private router: Router,private fb: FormBuilder) { }


  
  ngOnInit(): void {
    // this.userForm = this.fb.group({
    //   name: ['', [Validators.required, Validators.minLength(3)]],
    //   email: ['', [Validators.required, Validators.email]],
    //   // age: [null, [Validators.required, Validators.min(18)]]
    // });
  }

  onSubmit(): void {
    console.log(this.username);
  //  console.log(this.userForm);
    if (this.username === 'admin' && this.password === this.configPassword) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}