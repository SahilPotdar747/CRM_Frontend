import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class ProfileCrudComponent implements OnInit {
  userList = JSON.parse(localStorage.getItem('permissions'));
  ProfileUrl: string =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
  parmsId: string = null;

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;
  }

  //form submit
  submitForm() {
    let payload = new FormData();
    payload.append('firstName', this.userList.firstName);
    payload.append('lastName', this.userList.lastName);
    payload.append('userName', this.userList.userName);
    payload.append('email', this.userList.email);
    payload.append('tenant', this.userList.tenant._id);

    payload.append('password', this.userList.password);
    payload.append('confirmPassword', this.userList.confirmPassword);
    return payload;
  }

  // on form submit function...F
  onsubmit(data) {
    if (this.parmsId) {
      this.http
        .request('patch', '/user/' + this.parmsId, this.submitForm())
        .subscribe((res) => {
          console.log('update user', res);
          localStorage.removeItem('permissions');
          localStorage.setItem('permissions', JSON.stringify(res['user']));
          this.router.navigateByUrl('/dashboard');
        });
    } else {
      if (data.valid) {
        this.http
          .request('post', '/user', this.submitForm())
          .subscribe((res) => {
            console.log('res', res);
            this.router.navigateByUrl('/dashboard');
          });
      } else {
        console.log('invalid fields');
      }
    }
  }

  // profile picture upload
  uploadProfile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.userList.userImage = event.target.files[0];
    reader.onload = (events: any) => {
      this.ProfileUrl = events.target.result;
    };
  }
}
