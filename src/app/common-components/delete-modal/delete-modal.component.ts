import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data :any) { }

  ngOnInit(): void {
    console.log("deleted id ", this.data);
    
  }


}
