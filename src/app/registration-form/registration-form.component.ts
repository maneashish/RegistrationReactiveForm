import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  registeredUsers: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers) {
      this.registeredUsers = storedUsers;
    }
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    const email = this.registrationForm.value.email;
    if (this.isEmailRegistered(email)) {
      alert('This email is already registered!');
      return;
    }
    this.registeredUsers.push(this.registrationForm.value);
    localStorage.setItem('users', JSON.stringify(this.registeredUsers));
    this.registrationForm.reset();
    this.submitted = false;
  }

  isEmailRegistered(email: string): boolean {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return storedUsers.some((user: any) => user.email === email);
  }

  clearRegisteredUsers() {
    localStorage.removeItem('users');
    this.registeredUsers = [];
  }
}
