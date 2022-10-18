import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../common-services/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthInfoService } from '../common-services/auth-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  showLoginPage: boolean = false;
  userData: any;

  constructor(
    private http: HttpRequestService,
    private router: Router,
    private authInfo: AuthInfoService,
    private formBuilder: FormBuilder
  ) {}

  // login form initilization
  loginForm = this.formBuilder.group({
    email: ['sahilpotdar12@gmail.com', [Validators.required, Validators.email]],
    password: ['password', Validators.required],
  });

  // sign up form initilization
  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    tenant_domain: ['', Validators.required],
    tenant_name: ['', Validators.required],
  });

  ngOnInit(): void {
    document.querySelector('.img-btn').addEventListener('click', function () {
      document.querySelector('.cont').classList.toggle('s-signup');
    });
  }

  // log in api
  onLoginSubmit() {
    try {
      this.http
        .request('post', '/user/login', this.loginForm.value)
        .subscribe((res) => {
          this.authInfo.setAuthToken = res['token'];
          localStorage.setItem('token', this.authInfo.getAuthToken);
          localStorage.setItem('permissions', JSON.stringify(res['user']));
          this.router.navigateByUrl('/dashboard');
          this.userData = res['user'];
        });
    } catch (error) {
      console.log('error', error);
    }
  }
  // log in api
  onSignUpSubmit() {
    try {
      this.http
        .request('post', '/tenant', this.signUpForm.value)
        .subscribe((res) => {
          // this.authInfo.setAuthToken = res['token'];
          // localStorage.setItem('token', this.authInfo.getAuthToken);
          // this.authInfo.setuserInfo = res['user'];
          // this.router.navigateByUrl('/dashboard');
        });
    } catch (error) {
      console.log('error', error);
    }
  }

  // change form signup to login
  changeFormate() {
    if (this.showLoginPage) {
      this.showLoginPage = false;
    } else {
      this.showLoginPage = true;
    }
  }
}
