import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';

import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class ContactsCrudComponent implements OnInit {
  ProfileUrl: string =
    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
  parmsId: string = null;
  dateFormate: any;

  contactData: any = {
    firstName: '',
    lastName: '',
    primaryEmail: '',
    officePhone: '',
    mobilePhone: '',
    fax: '',
    dateOfBirth: new Date(),
    title: '',
    leadSource: '',
    department: '',
    homePhone: '',
    secondaryPhone: '',
    assistant: '',
    assistantPhone: '',
    secondaryEmail: '',
    mailingStreet: '',
    assignedTo: '621a05ab998c101c4cdfa0d8',
    doNotCall: 'false',
    reference: 'false',
    emailOtpOut: 'false',
    notifyOwner: 'false',
    tenant: this.auth.getTenantId,
  };

  address: any = {
    mailingState: '',
    otherStreet: '',
    mailingCity: '',
    mailingBox: '',
    otherBox: '',
    otherCity: '',
    otherState: '',
    mailingZip: '',
    otherZip: '',
    mailingCountry: '',
    otherCountry: '',
  };

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute,
    private auth: AuthInfoService
  ) {}

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;
    if (this.parmsId) {
      this.getContactById();
    }
  }

  getContactById() {
    this.http
      .request('get', '/contact/' + this.parmsId, null)
      .subscribe((response: any) => {
        this.contactData = response.contact;
        this.address = this.contactData?.address;

        this.dateFormate = new Date(response.contact.dateOfBirth)
          .toISOString()
          .split('T')[0];
      });
  }

  submitFormData() {
    let payload = new FormData();
    payload.append('firstName', this.contactData.firstName);
    payload.append('lastName', this.contactData.lastName);
    payload.append('primaryEmail', this.contactData.primaryEmail);
    payload.append('officePhone', this.contactData.officePhone);
    payload.append('mobilePhone', this.contactData.mobilePhone);
    payload.append('fax', this.contactData.fax);
    payload.append('dateOfBirth', this.dateFormate);
    payload.append('title', this.contactData.title);
    payload.append('leadSource', this.contactData.leadSource);
    payload.append('department', this.contactData.department);
    payload.append('homePhone', this.contactData.homePhone);
    payload.append('secondaryPhone', this.contactData.secondaryPhone);
    payload.append('assistant', this.contactData.assistant);
    payload.append('assistantPhone', this.contactData.assistantPhone);
    payload.append('secondaryEmail', this.contactData.secondaryEmail);
    payload.append('mailingStreet', this.address.mailingStreet);
    payload.append('mailingState', this.address.mailingState);
    payload.append('otherStreet', this.address.otherStreet);
    payload.append('mailingCity', this.address.mailingCity);
    payload.append('mailingBox', this.address.mailingBox);
    payload.append('otherBox', this.address.otherBox);
    payload.append('otherCity', this.address.otherCity);
    payload.append('otherState', this.address.otherState);
    payload.append('mailingZip', this.address.mailingZip);
    payload.append('otherZip', this.address.otherZip);
    payload.append('mailingCountry', this.address.mailingCountry);
    payload.append('otherCountry', this.address.otherCountry);
    payload.append('assignedTo', this.contactData.assignedTo);
    payload.append('emailOtpOut', this.contactData.emailOtpOut);
    payload.append('notifyOwner', this.contactData.notifyOwner);
    payload.append('reference', this.contactData.reference);
    payload.append('doNotCall', this.contactData.doNotCall);
    payload.append('tenant', this.contactData.tenant);

    return payload;
  }

  contactSubmit(data: any) {
    if (this.parmsId) {
      this.http
        .request('patch', '/contact/' + this.parmsId, this.submitFormData())
        .subscribe((res) => {
          console.log('update contact', res);
          this.router.navigateByUrl('/contacts/list');
        });
    } else {
      if (data.valid) {
        this.http
          .request('post', '/contact', this.submitFormData())
          .subscribe((res) => {
            console.log('data', res);
            this.router.navigateByUrl('/contacts/list');
          });
      } else {
        console.log('invalid fields');
      }
    }
  }

  // upload profile page
  uploadProfile(event: any) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (events: any) => {
      this.ProfileUrl = events.target.result;
    };
  }
}
