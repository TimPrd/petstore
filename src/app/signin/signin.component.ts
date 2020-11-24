import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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

  onSubmitSignin() {
    const { username, password } = this.form.value;
    this.authService.signin({ username, password }).subscribe(
      (jwt) => console.log(jwt),
      (error) => console.log(error),
      () => console.log('done')
    );
  }
}
