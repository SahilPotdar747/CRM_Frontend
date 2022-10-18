import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userList = JSON.parse(localStorage.getItem('permissions'));
  list: any = [];
  roleCount: any;
  grouplist: any = [];
  groupCount: any;
  userlist: any = [];
  userCount: any;
  contactList: any = [];
  contactCount: any;
  leadList: any = [];
  leadcount: any;
  canvas: any;
  ctx: any;

  @ViewChild('mychart') mychart: any;
  @ViewChild('mychart1') mychart1: any;
  @ViewChild('mychart2') mychart2: any;

  constructor(private http: HttpRequestService) {}

  ngOnInit(): void {
    //role management
    this.getALlUsersRole();

    //group management
    this.getAllGroups();

    //user mannagement
    this.getALlUsers();

    //contact management
    this.getAllContact();

    //lead management
    this.getALlLeads();
  }

  ngAfterViewInit(): void {
    //chart 1
    this.chartInitilize();

    //chart 2
    this.barchart();

    //chart 3
    this.doughnut();
  }

  //chart 1
  chartInitilize() {
    this.canvas = this.mychart.nativeElement;

    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',

      options: {
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],

          yAxes: [
            {
              display: true,
            },
          ],
        },
      },

      data: {
        labels: ['2013', '2016', '2019', '2029', '2039', '2050'],

        datasets: [
          {
            label: '74 Orders',

            data: [0, 55, 7, 67, 0, 100],

            fill: true,

            borderColor: 'rgb(255, 99, 132)',

            pointBackgroundColor: 'rgb(255, 99, 132)',

            pointBorderColor: '#fff',

            pointHoverBackgroundColor: '#fff',

            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      },
    });
  }

  //chart 2
  barchart() {
    this.canvas = this.mychart1.nativeElement;

    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'bar',

      options: {
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],

          yAxes: [
            {
              display: true,
            },
          ],
        },
      },

      data: {
        labels: ['2013', '2016', '2019', '2029', '2039', '2050'],

        datasets: [
          {
            label: '74 Orders',

            data: [0, 55, 7, 67, 0, 100],

            fill: true,

            borderColor: 'rgb(255, 99, 132)',

            pointBackgroundColor: 'rgb(255, 99, 132)',

            pointBorderColor: '#fff',

            pointHoverBackgroundColor: '#fff',

            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      },
    });
  }

  //chart 3
  doughnut() {
    this.canvas = this.mychart2.nativeElement;

    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',

      options: {
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],

          yAxes: [
            {
              display: true,
            },
          ],
        },
      },

      data: {
        labels: ['2013', '2016', '2019', '2029', '2039', '2050'],

        datasets: [
          {
            label: '74 Orders',

            data: [0, 55, 7, 67, 0, 100],

            fill: true,

            borderColor: 'rgb(255, 99, 132)',

            pointBackgroundColor: 'rgb(255, 99, 132)',

            pointBorderColor: '#fff',

            pointHoverBackgroundColor: '#fff',

            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      },
    });
  }

  // collapseSide() {
  //   $('.sidebar').toggleClass('d-none');
  //   $('.menu-icon__cheeckbox').prop('checked', false);
  // }

  //role management
  getALlUsersRole() {
    this.http.request('get', '/role', null).subscribe((res) => {
      this.list = res['role'];
      this.roleCount = this.list.length;
    });
  }

  //group managemnet
  getAllGroups() {
    this.http.request('get', '/group', null).subscribe((res) => {
      this.grouplist = res['group'];
      this.groupCount = this.grouplist.length;
    });
  }

  //user managemnet
  getALlUsers() {
    this.http.request('get', '/user', null).subscribe((res) => {
      this.userlist = res['users'];

      this.userCount = this.userlist.length;
    });
  }

  //conatct management
  getAllContact() {
    this.http.request('get', '/contact', null).subscribe((res) => {
      this.contactList = res['contact'];
      this.contactCount = this.contactList.length;
    });
  }

  //lead management
  getALlLeads() {
    this.http.request('get', '/lead', null).subscribe((res: any) => {
      this.leadList = res.Leads;
      this.leadcount = this.leadList.length;
    });
  }
}
