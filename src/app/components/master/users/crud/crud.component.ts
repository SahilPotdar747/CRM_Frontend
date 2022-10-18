import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { userCreate } from 'src/app/models/users';
import { fabric } from 'fabric';
import { Roles } from 'src/app/models/master';
import { CommonService } from 'src/app/common-services/common.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class UsersCrudComponent implements OnInit, AfterContentInit {
  /////////////////////////////////
  // master default data
  /////////////////////////////////
  defaultLeadView = ['Today', 'Last 2 Days', 'Last Weeks'];
  defaultRecordView = ['Summary', 'Details'];
  userAddress: any = {
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  };

  userInfo: any = {
    title: '',
    fax: '',
    department: '',
    otherEmail: '',
    officePhone: '',
    mobilePhone: '',
    secondaryEmail: '',
    homePhone: '',
    secondaryPhone: '',
    signature: '',
    internalMailComposer: false,
    language: '',
    defaultRecordView: 'Today',
    leftPanelHide: true,
    reportsTo: '621a05ab998c101c4cdfa0d8',
  };

  ProfileUrl: string =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  canvas: any;
  // user response formate
  roleName: any;
  // roleName: any = {
  //   name: '',
  // };

  userForm: any = {
    userImage: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    passwordConfirm: '',
    dob: new Date(),
    admin: true,
    role: '',

    defaultLeadView: 'Summary',
    tenant: this.auth.getTenantId,
  };
  // pre define datas array declare..
  roleList: Array<Roles> = [];
  // user edit or create flag
  parmsId: string = null;
  dateFormate: any;

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute,
    private auth: AuthInfoService
  ) {}

  ngOnInit(): void {
    //signature
    this.canvas = new fabric.Canvas('sig-canvas', {});
    this.canvas.isDrawingMode = true;

    this.getRoles();
    // chehck where user is created or edited
    this.parmsId = this.routes.snapshot.params.id;

    // if user is editable then call all api to get user info...
  }

  ngAfterContentInit(): void {
    this.parmsId = this.routes.snapshot.params.id;
    if (this.parmsId) {
      this.getUserDetails();
    } else {
    }
  }

  // get users role
  getRoles() {
    this.http.request('get', '/role', null).subscribe((res) => {
      this.roleList = res['role'];
    });
  }

  //signature
  clearSignature() {
    this.canvas.clear();
  }

  // get single user details
  getUserDetails() {
    try {
      this.http
        .request('get', '/user/' + this.parmsId, null)
        .subscribe((res) => {
          this.userForm = res['userDetail'];
          this.userAddress = this.userForm.address;
          this.userInfo = this.userForm.information;
          this.roleName = this.userForm?.role?.name;
          console.log('userInfo', this.userInfo);

          this.dateFormate = new Date(this.userForm.dob)
            .toISOString()
            .split('T')[0];
        });
    } catch (error) {
      console.log(error);
    }
  }

  // on form submit function...F
  onsubmit(data: any) {
    if (this.parmsId) {
      this.http
        .request('patch', '/user/' + this.parmsId, this.submitFormData())
        .subscribe((res) => {
          console.log('update user', res);
          this.router.navigateByUrl('/master/users/list');
        });
    } else {
      if (data.valid) {
        this.http
          .request('post', '/user', this.submitFormData())
          .subscribe((res) => {
            console.log('res', res);
            this.router.navigateByUrl('/master/users/list');
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
    this.userForm.userImage = event.target.files[0];
    reader.onload = (events: any) => {
      this.ProfileUrl = events.target.result;
    };
  }

  // formData formate data
  submitFormData() {
    let formObj = new FormData();
    formObj.append('userName', this.userForm.userName);
    formObj.append('firstName', this.userForm.firstName);
    formObj.append('city', this.userAddress.city);
    formObj.append('country', this.userAddress.country);
    formObj.append('defaultLeadView', this.userForm.defaultLeadView);
    formObj.append('defaultRecordView', this.userInfo.defaultRecordView);
    formObj.append('department ', this.userInfo.department);
    formObj.append('email', this.userForm.email);
    formObj.append('gender', this.userForm.gender);
    formObj.append('homePhone', JSON.stringify(this.userInfo.homePhone));
    formObj.append('lastName', this.userForm.lastName);
    formObj.append('mobilePhone', JSON.stringify(this.userInfo.mobilePhone));
    formObj.append('officePhone', JSON.stringify(this.userInfo.officePhone));
    formObj.append('otherEmail', this.userInfo.otherEmail);

    if (!this.parmsId) {
      formObj.append('password', this.userForm.password);
      formObj.append('passwordConfirm', this.userForm.passwordConfirm);
    }

    formObj.append('postalCode', this.userAddress.postalCode);
    formObj.append('role', this.roleName);
    formObj.append('secondaryEmail', this.userInfo.secondaryEmail);
    formObj.append(
      'secondaryPhone',
      JSON.stringify(this.userInfo.secondaryPhone)
    );
    formObj.append('state', this.userAddress.state);
    formObj.append('streetAddress', this.userAddress.streetAddress);
    formObj.append('userImage', this.userForm.userImage);
    formObj.append('admin', JSON.stringify(this.userForm.admin));
    formObj.append('dob', this.dateFormate);
    formObj.append('fax', JSON.stringify(this.userInfo.fax));
    formObj.append('title', this.userInfo.title);
    formObj.append('tenant', this.userForm.tenant);
    formObj.append('signature', this.userInfo.signature);
    formObj.append('reportsTo', this.userInfo.reportsTo);
    formObj.append(
      'leftPanelHide',
      JSON.stringify(this.userInfo.leftPanelHide)
    );
    formObj.append('language', this.userInfo.language);
    formObj.append(
      'internalMailComposer',
      JSON.stringify(this.userInfo.internalMailComposer)
    );

    console.log();

    return formObj;
  }

  // set project data
  setUserDeatils(data: any) {
    this.userForm['userName'] = data?.userName;
    this.userForm['firstName'] = data?.firstName;
    this.userForm['city'] = data?.address?.city;
    this.userForm['country'] = data?.address?.country;
    this.userForm['state'] = data?.address?.state;
    this.userForm['defaultLeadView'] = data?.defaultLeadView;
    this.userForm['role'] = data?.role;
    this.userForm['defaultRecordView'] = data?.information?.defaultRecordView;
    this.userForm['email'] = data?.email;
    this.userForm['gender'] = data?.gender;
    this.userForm['lastName'] = data?.lastName;
    this.userForm['admin'] = data?.admin;
    this.userForm['dob'] = data?.dob;
    this.userForm['fax'] = data?.information?.fax;
    this.userForm['title'] = data?.information?.title;
    this.userForm['tenant'] = data?.tenant;
    this.userInfo['signature'] = data?.information?.signature;
    this.userInfo['leftPanelHide'] = data?.information?.leftPanelHide;
    this.userForm['department'] = data?.information?.department;
    this.userInfo['homePhone'] = data?.information?.homePhone;
    this.userInfo['mobilePhone'] = data?.information?.mobilePhone;
    (this.userInfo['officePhone'] = data?.information?.officePhone),
      (this.userInfo['otherEmail'] = data?.information?.otherEmail),
      (this.userInfo['secondaryEmail'] = data?.information?.secondaryEmail),
      (this.userInfo['secondaryPhone'] = data?.information?.secondaryPhone),
      (this.userForm['streetAddress'] = data?.address?.streetAddress),
      (this.userInfo['reportsTo'] = data?.information?.reportsTo),
      (this.userInfo['language'] = data?.information?.language);
    this.userForm['internalMailComposer'] =
      data?.information?.internalMailComposer;
    this.userForm['postalCode'] = data?.address?.postalCode;
    // obj['userImage'] = data.userImage,
    // obj['password'] = data.password,
    // obj['passwordConfirm'] = data.passwordConfirm,
  }
}
