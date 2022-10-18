import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

declare const $: any;

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  userList = JSON.parse(localStorage.getItem('permissions'));

  constructor(
    private router: Router,
    private auth: AuthInfoService,
    private http: HttpRequestService
  ) {}

  ngOnInit(): void {
    $('.sidebar-dropdown > a').click(function () {
      $('.sidebar-submenu').slideUp(200);
      if ($(this).parent().hasClass('active')) {
        $('.sidebar-dropdown').removeClass('active');
        $(this).parent().removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this).next('.sidebar-submenu').slideDown(200);
        $(this).parent().addClass('active');
      }
    });

    $('#close-sidebar').click(function () {
      $('.page-wrapper').removeClass('toggled');
    });
    $('#show-sidebar').click(function () {
      $('.page-wrapper').addClass('toggled');
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
