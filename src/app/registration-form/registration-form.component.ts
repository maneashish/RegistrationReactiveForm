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
    this.loadUsersFromLocalStorage(); // Load users on component init
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // If form is invalid, do not proceed
    if (this.registrationForm.invalid) {
      return;
    }

    const email = this.registrationForm.value.email;

    // Check if the email already exists in localStorage
    if (this.isEmailRegistered(email)) {
      alert('This email is already registered!');
      return;
    }

    // Add new user to registeredUsers array and update localStorage
    this.registeredUsers.push(this.registrationForm.value);
    this.updateLocalStorage();

    // Reset form and submitted flag
    this.registrationForm.reset();
    this.submitted = false;
  }

  // Check if email already exists in registeredUsers
  isEmailRegistered(email: string): boolean {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return storedUsers.some((user: any) => user.email === email);
  }

  // Save registered users to localStorage
  updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.registeredUsers));
  }

  // Load users from localStorage on component initialization
  loadUsersFromLocalStorage() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers) {
      this.registeredUsers = storedUsers;
    }
  }

  // Clear all registered users
  clearRegisteredUsers() {
    localStorage.removeItem('users'); // Clear localStorage
    this.registeredUsers = []; // Reset the array
  }
}
