import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() {
    return this.form.controls
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", [Validators.maxLength(100)]],
      password: ["", [Validators.maxLength(100)]]
    });
  }

  onSubmitSignup() {
    const { username, password } = this.form.value;
    this.authService.signup({ username, password }).subscribe(
      (jwt) => console.log(jwt),
      (error) => console.log(error),
      () => console.log('done')
    );
  }

  // login() {

  // }

}
