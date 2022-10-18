import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/common-components/delete-modal/delete-modal.component';
import { PopUpModalComponent } from 'src/app/common-components/pop-up-modal/pop-up-modal.component';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

declare const $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class UsersListComponent implements OnInit {
  list: any = [];

  constructor(private http: HttpRequestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getALlUsers();
  }
  loadDataTable() {
    $(document).ready(function () {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'excel',
            text: `<i class="fas fa fa-download"></i> Export Users`,
            filename: 'User Report',
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

  getALlUsers() {
    this.http.request('get', '/user', null).subscribe((res) => {
      this.list = res['users'];
      console.log(res);

      if (this.list) {
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
    this.http.request('delete', '/user/' + id, null).subscribe((res) => {
      console.log('delete res', res);
      this.getALlUsers();
    });
  }

  // upload user import CSV File

  // profile picture upload
  uploadCSVFile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    if (event.target.files[0]) {
      this.ImportUserPopUp(event.target.files[0]);
    }
  }

  // import  common  popu[p function
  ImportUserPopUp(data: any) {
    const dialogData = this.dialog.open(PopUpModalComponent, {
      data: { content: 'Are you sure you want to Import Users ?', id: data },
    });
    // get value after dialog box closed
    dialogData.afterClosed().subscribe((res) => {
      // if user click yes then  import function  api call
      if (res) {
        this.ImportUser(res);
      }
    });
  }

  // import  user
  ImportUser(id: any) {
    let formData = new FormData();
    formData.append('csv', id);

    this.http.request('post', '/user/import', formData).subscribe((res) => {
      this.getALlUsers();
    });
  }
}
