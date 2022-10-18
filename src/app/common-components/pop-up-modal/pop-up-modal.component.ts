import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.scss'],
})
export class PopUpModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
