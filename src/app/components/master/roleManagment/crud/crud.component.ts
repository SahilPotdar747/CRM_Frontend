import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class RoleManagementCrudComponent implements OnInit {
  // form group
  roleManagment = new FormGroup({
    name: new FormControl('', Validators.required),
    accessProfile: new FormControl('', Validators.required),
  });
  // defaul list
  accesList: Array<any> = [
    'Administrator',
    'Sales Profile',
    'Support Profile',
    'Guest Profile',
  ];
  parmsId: string;

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;

    if (this.parmsId) {
      this.getSingleRole();
    }
  }

  getSingleRole() {
    this.http.request('get', '/role/' + this.parmsId, null).subscribe((res) => {
      console.log('role data ', res);
      let data = res['role'];
      this.roleManagment = new FormGroup({
        name: new FormControl(data['name'], Validators.required),
        accessProfile: new FormControl(
          data['accessProfile'],
          Validators.required
        ),
      });
    });
  }

  onSubmitForm() {
    if (this.roleManagment.valid) {
      if (this.parmsId) {
        this.http
          .request('patch', '/role/' + this.parmsId, this.roleManagment.value)
          .subscribe((res) => {
            console.log('update', res);
            this.router.navigateByUrl('/master/role');
          });
      } else {
        this.http
          .request('post', '/role', this.roleManagment.value)
          .subscribe((res) => {
            console.log('res', res);
            this.router.navigateByUrl('/master/role');
          });
      }
    }
  }
}
