import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class LeadCrudComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute
  ) {}

  parmsId: string = null;

  LeadValues: any = {
    firstName: '',
    lastName: '',
    primaryEmail: '',
    rating: '',
    secondaryEmail: ' ',
    address: {
      country: '',
      city: '',
      pobox: '',
      postalCode: '',
      state: '',
      street: '',
    },
  };
  description: {
    desc: '';
  };

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;
  }
  ngAfterViewInit(): void {
    if (this.parmsId) {
      this.getLeadDetails();
    } else {
    }
  }

  addleads() {
    let obj = {
      firstName: this.LeadValues?.firstName,
      lastName: this.LeadValues?.lastName,
      primaryEmail: this.LeadValues?.primaryEmail,
      rating: this.LeadValues?.rating,
      secondaryEmail: this.LeadValues?.secondaryEmail,
      country: this.LeadValues?.address?.country,
      city: this.LeadValues?.address?.city,
      pobox: this.LeadValues?.address?.pobox,
      postalCode: this.LeadValues?.address?.postalCode,
      state: this.LeadValues?.address.state,
      street: this.LeadValues?.address?.street,
      desc: this.description,
    };

    // const payload = new FormData();

    // payload.append('firstName', this.LeadValues?.firstName);
    // payload.append('lastName', this.LeadValues?.lastName);
    // payload.append('primaryEmail', this.LeadValues?.primaryEmail);
    // payload.append('rating', this.LeadValues?.rating);
    // payload.append('secondaryEmail', this.LeadValues?.secondaryEmail);
    // payload.append('country', this.LeadValues?.address?.country);
    // payload.append('city', this.LeadValues?.address?.city);
    // payload.append('pobox', this.LeadValues?.address?.pobox);
    // payload.append('postalCode', this.LeadValues?.address?.postalCode);
    // payload.append('state', this.LeadValues?.address.state);
    // payload.append('street', this.LeadValues?.address?.street);
    // payload.append('description', this.LeadValues?.description?.desc);

    return obj;
  }

  leadSubmit(data: any) {
    if (this.parmsId) {
      this.http
        .request('patch', '/lead/' + this.parmsId, this.addleads())
        .subscribe((res) => {
          console.log('update lead', res);

          this.router.navigateByUrl('/lead/list');
        });
    } else {
      if (data.valid) {
        this.http.request('post', '/lead', this.addleads()).subscribe((res) => {
          console.log('data', res);
          this.router.navigateByUrl('/lead/list');
        });
      } else {
        console.log('invalid fields');
      }
    }
  }

  // get single user details
  getLeadDetails() {
    try {
      this.http
        .request('get', '/lead/' + this.parmsId, null)
        .subscribe((res: any) => {
          this.LeadValues = res.lead;
          this.description = this.LeadValues.description.desc;
        });
    } catch (error) {
      console.log(error);
    }
  }
}
