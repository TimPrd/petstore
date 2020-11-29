import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form;
  isAlert: boolean = false;
  constructor(private loader: LoadingService, private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  get f() {
    return this.form.controls
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.maxLength(100)]],
      password: ["", [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmitSignin() {
    this.loader.loading = true;
    const { username, password } = this.form.value;
    this.authService.signin({ username, password }).subscribe(
      (jwt) => {
        this.router.navigate(['/home']);
        console.log(jwt);
      },
      (error) => {
        this.isAlert = true;
        this.loader.loading = false
      },
      () => this.loader.loading = false
    );
  }

  closeAlert() {
    this.isAlert = false
  }
}
