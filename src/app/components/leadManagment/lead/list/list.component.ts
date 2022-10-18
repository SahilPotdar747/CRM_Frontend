import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { DeleteModalComponent } from 'src/app/common-components/delete-modal/delete-modal.component';
import { PopUpModalComponent } from 'src/app/common-components/pop-up-modal/pop-up-modal.component';

declare const $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class LeadListComponent implements OnInit {
  constructor(private http: HttpRequestService, private dialog: MatDialog) {}
  leadList: any = [];
  leadAddress: any = [];

  ngOnInit(): void {
    this.getALlLeads();
  }

  loadDataTable() {
    $(document).ready(function () {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'excel',
            text: `<i class="fas fa fa-download"></i> Export Leads`,
            filename: 'Lead Report',
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
  getALlLeads() {
    // this.http.request('get','get')
    this.http.request('get', '/lead', null).subscribe((res: any) => {
      this.leadList = res.Leads;

      if (this.leadList) {
        this.loadDataTable();
      }
    });
  }

  deleteLead(id: string) {
    this.http
      .request('delete', '/lead/' + id, null)
      .subscribe((response: any) => {
        console.log('deleted-lead', response);
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
    this.http.request('delete', '/lead/' + id, null).subscribe((res) => {
      console.log('delete-lead-with-id', res);
      this.getALlLeads();
    });
  }

  // upload user import CSV File

  // profile picture upload
  uploadCSVFile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    if (event.target.files[0]) {
      this.ImportLeadPopUp(event.target.files[0]);
    }
  }

  // import  common  popu[p function
  ImportLeadPopUp(data: any) {
    const dialogData = this.dialog.open(PopUpModalComponent, {
      data: { content: 'Are you sure you want to Import Leads ?', id: data },
    });
    // get value after dialog box closed
    dialogData.afterClosed().subscribe((res) => {
      // if user click yes then  import function  api call
      if (res) {
        this.ImportLead(res);
      }
    });
  }

  // import  user
  ImportLead(id: any) {
    let formData = new FormData();
    formData.append('csv', id);
    this.http.request('post', '/lead/import', formData).subscribe((res) => {
      this.getALlLeads();
    });
  }
}
