import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isForDashboard: boolean = true;
  userList = JSON.parse(localStorage.getItem('permissions'));
  ProfileUrl: string =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(
    private router: Router,
    private auth: AuthInfoService,
    private http: HttpRequestService
  ) {}

  ngOnInit(): void {
    //header animation
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
        $('nav').addClass('sticky');
      } else {
        $('nav').removeClass('sticky');
      }
    });
  }

  logout() {
    this.http
      .request('post', '/user/logout/' + this.auth.getAuthInfo['_id'], null)
      .subscribe((res) => {
        console.log(res, res);
        this.router.navigateByUrl('/auth');
        localStorage.clear();
      });
  }
}
