import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { DeleteModalComponent } from 'src/app/common-components/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
declare const $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RoleManagementListComponent implements OnInit {
  list: any = [];

  constructor(private http: HttpRequestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getALlUsersRole();
  }

  loadDataTable() {
    $(document).ready(function () {
      $('#example').DataTable({
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
  getALlUsersRole() {
    this.http.request('get', '/role', null).subscribe((res) => {
      this.list = res['role'];
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
    this.http.request('delete', '/role/' + id, null).subscribe((res) => {
      console.log('delete res', res);
      this.getALlUsersRole();
    });
  }
}
