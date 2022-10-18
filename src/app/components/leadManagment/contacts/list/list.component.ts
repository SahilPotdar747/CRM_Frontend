import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/common-components/delete-modal/delete-modal.component';
import { PopUpModalComponent } from 'src/app/common-components/pop-up-modal/pop-up-modal.component';

declare const $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  parmsId: string;
  contactList: any;
  constructor(private http: HttpRequestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllContact();
  }

  loadDataTable() {
    $(document).ready(function () {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'excel',
            text: `<i class="fas fa fa-download"></i> Export Contacts`,
            filename: 'Contact Report',
          },
        ],
        info: false,
        pagingType: 'full_numbers',
        bLengthChange: false,

        order: [],
        columnDefs: [
          {
            targets: [-1, 0],
            orderable: false,
          },
        ],

        language: {
          paginate: {
            first: '<i class="fas fa fa-angle-double-left"></i>',

            last: '<i class="fas fa fa-angle-double-right"></i>',

            next: '<i class="fas fa fa-angle-right"></i>',

            previous: '<i class="fas fa fa-angle-left"></i>',
          },
          searchPlaceholder: 'Search records',
          search: '',
        },
      });
    });
  }

  deleteContact(id: string) {
    this.http
      .request('delete', '/contact/' + id, null)
      .subscribe((response: any) => {
        console.log('Deleted Contact', response);
      });
  }

  getAllContact() {
    // this.http.request('get','get')
    this.http.request('get', '/contact', null).subscribe((res) => {
      this.contactList = res['contact'];

      if (this.contactList) {
        this.loadDataTable();
      }
    });
  }
  // delete common function
  delete(id: any) {
    //open dialog box and pass id
    const dialogData = this.dialog.open(DeleteModalComponent, {
      data: { id },
    });
    // get value after dialog box closed
    dialogData.afterClosed().subscribe((id) => {
      // if user click yes then  delete function  api call
      if (id) {
        this.deleteUser(id);
      }
    });
  }

  // delete user
  deleteUser(id: any) {
    this.http.request('delete', '/contact/' + id, null).subscribe((res) => {
      console.log('delete res', res);
      this.getAllContact();
    });
  }

  // upload user import CSV File

  // profile picture upload
  uploadCSVFile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    if (event.target.files[0]) {
      this.ImportContactPopUp(event.target.files[0]);
    }
  }

  // import  common  popu[p function
  ImportContactPopUp(data: any) {
    const dialogData = this.dialog.open(PopUpModalComponent, {
      data: { content: 'Are you sure you want to Import Contacts ?', id: data },
    });
    // get value after dialog box closed
    dialogData.afterClosed().subscribe((res) => {
      // if user click yes then  import function  api call
      if (res) {
        this.ImportContact(res);
      }
    });
  }

  // import  user
  ImportContact(id: any) {
    let formData = new FormData();
    formData.append('csv', id);

    this.http.request('post', '/contact/import', formData).subscribe((res) => {
      console.log('contact-imported', res);
      this.getAllContact();
    });
  }
}
