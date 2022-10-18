import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class GroupCrudComponent implements OnInit {
  parmsId: string = null;
  // form group
  groupManagment = new FormGroup({
    groupName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  // GroupValue: any = {
  //   groupName: '',
  //   description: '',
  // };
  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;

    // chehck if edit woork'
    if (this.parmsId) {
      this.getSingleGroupName();
    }
  }
  // submitFormData() {
  //   let payload = new FormData();
  //   payload.append('groupName', this.GroupValue.groupName);
  //   payload.append('description', this.GroupValue.description);
  //   return payload;
  // }

  // on form submit function...F
  onsubmit() {
    if (this.groupManagment.valid) {
      if (this.parmsId) {
        this.http
          .request('patch', '/group/' + this.parmsId, this.groupManagment.value)
          .subscribe((res) => {
            console.log('update group', res);
            this.router.navigateByUrl('/master/group');
          });
      } else {
        this.http
          .request('post', '/group', this.groupManagment.value)
          .subscribe((res) => {
            console.log('res', res);
            this.router.navigateByUrl('/master/group');
          });
      }
    }
  }

  // get single group name
  getSingleGroupName() {
    this.http
      .request('get', '/group/' + this.parmsId, null)
      .subscribe((res) => {
        let data = res['group'];

        this.groupManagment = new FormGroup({
          groupName: new FormControl(data['groupName'], Validators.required),
          description: new FormControl(
            data['description'],
            Validators.required
          ),
        });

        // this.GroupValue = res['group'];
      });
  }
}
