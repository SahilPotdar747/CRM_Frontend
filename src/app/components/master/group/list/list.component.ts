import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthInfoService } from 'src/app/common-services/auth-info.service';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { DeleteModalComponent } from 'src/app/common-components/delete-modal/delete-modal.component';

declare const $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class GroupListComponent implements OnInit {
  list: any = [];

  constructor(
    private router: Router,
    private http: HttpRequestService,
    private routes: ActivatedRoute,
    private auth: AuthInfoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getALlGrps();
  }

  //get all groups
  getALlGrps() {
    this.http.request('get', '/group', null).subscribe((res) => {
      this.list = res['group'];

      if (this.list) {
        this.loadDataTable();
      }
    });
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
        this.deleteGrp(id);
      }
    });
  }

  // delete user
  deleteGrp(id: any) {
    this.http.request('delete', '/group/' + id, null).subscribe((res) => {
      console.log('delete res', res);
      this.getALlGrps();
    });
  }
}
