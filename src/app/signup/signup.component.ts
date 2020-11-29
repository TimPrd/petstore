import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form;
  isAlert: boolean = false;
  constructor(private loader: LoadingService, private fb: FormBuilder, private router: Router, private authService: AuthService, private parserFormatter: NgbDateParserFormatter) { }

  catergories = ["buyer", "seller"];

  ngOnInit(): void {
    this.createForm()
  }

  get f() {
    return this.form.controls
  }

  createForm() {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.maxLength(100)]],
      password: ["", [Validators.required, Validators.maxLength(100)]],
      birthday: [null, Validators.required],
      lastName: ["", [Validators.required, Validators.maxLength(100)]],
      firstName: ["", [Validators.required, Validators.maxLength(100)]],
      role: ['', Validators.required]
    });
  }

  onSubmitSignup() {
    const values = this.form.value;
    values.birthday = this.parserFormatter.format(values.birthday);
    this.authService.signup(values).subscribe(
      (data) => this.router.navigate(['/signin']),
      (error) => { this.isAlert = true; this.loader.loading = false; },
      () => this.loader.loading = false
    );
  }

  closeAlert() {
    this.isAlert = false;
  }
}
