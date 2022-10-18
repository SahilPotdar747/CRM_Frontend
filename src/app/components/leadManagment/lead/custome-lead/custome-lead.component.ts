import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DyanamicFormBuilderService } from 'src/app/dyanamic-form-builder.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpRequestService } from 'src/app/common-services/http-request.service';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-custome-lead',
  templateUrl: './custome-lead.component.html',
  styleUrls: ['./custome-lead.component.scss'],
})
export class CustomeLeadComponent implements OnInit {
  modalRef: BsModalRef;
  // newOptions: boolean = false;
  isEdit: boolean = false;
  taskIndex: any;
  taskData: any;
  // options: string[] = [];
  inputType: any;
  isNewTask: boolean = false;

  @ViewChild('EditFormType') EditFormType: TemplateRef<any>;

  constructor(
    public formBuilder: DyanamicFormBuilderService,
    private dialog: MatDialog,
    private modal: BsModalService,
    private http: HttpRequestService,
    private routes: ActivatedRoute
  ) {}

  parmsId: string = null;

  fieldData = {
    name: '',
    type: '',
    inputType: '',
    placeholder: '',
    label: '',
    DLabel: '',
    src: '',
    options: [],
  };

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
    description: {
      desc: '',
    },
  };

  initObject: any = [];

  formData = [];

  // on edit of field
  openEditTask(item: any, i: any) {
    // if (item.input_type == 'select') {
    //   this.newOptions = true;
    // }

    this.modalRef = this.modal.show(this.EditFormType, {
      backdrop: 'static',
      ignoreBackdropClick: false,
      class: 'modal-lg modal-dialog-centered',
    });

    this.taskData = item;
    // this.options = this.taskData.options;
    this.inputType = item.type;
    this.taskIndex = i;
  }

  // edit model open on click
  editTask(data: any) {
    this.isEdit = true;
    this.formData.splice(this.taskIndex, 1);
    let obj = {
      lableName: data.value['labelName'] ?? '',
      placeholder: data.value['placeholder'] ?? '',
      isRequired: data.value['isRequired'] ?? false,
      type: this.inputType,

      // options: this.options,
    };

    this.formData.push(obj);

    // this.options = [];

    // this.Auth.newTask.next(this.formData);

    this.modalRef.hide();
  }

  // delete field
  deleteTask(i: any) {
    this.taskIndex = i;
    let taskDelete = this.formData.splice(this.taskIndex, 1);
  }

  currentDroppedIndex = 0;
  @ViewChild('FormType') FormType: TemplateRef<any>;

  ngOnInit(): void {
    this.parmsId = this.routes.snapshot.params.id;
    if (this.parmsId) {
      this.getLeadDetails();
    }

    // new section
  }

  //** Drag and drop function */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.OpenFormPopUp(event.previousIndex);
    }
  }

  counter = 0;
  addSection() {
    // this.http
    //   .request('post', '/lead/block/' + this.parmsId, null)
    //   .subscribe((res: any) => {
    this.counter++;

    this.initObject.push({
      id: 'section_' + this.counter,
      fields: [],
    });

    for (let item of this.initObject) {
      this.formData.push(item);
      this.formData = this.formData.filter((x: any, index) => {
        return this.formData.indexOf(x) === index;
      });
    }
    console.log('formdata', this.formData);

    //   console.log(res);
    //   console.log(this.initObject);
    // });
  }

  //** Open popup while dragging fields */
  OpenFormPopUp(index: any) {
    this.currentDroppedIndex = index;
    //open dialog box and pass id
    this.modalRef = this.modal.show(this.FormType, {
      backdrop: 'static',
      ignoreBackdropClick: false,
      class: 'modl-lg modal-dialog-centered',
    });
  }

  // dynamic form controls
  dynamicFormData(data: any) {
    let obj = {
      type: this.formBuilder.formBuilder[this.currentDroppedIndex]['type'],
      lableName: data.value['lableName'],
      placeholder: data.value['placeholder'],
      isRequired: data.value['isRequired'] ?? false,
    };
    this.formData.push(obj);
  }

  dyanamicData(data: any) {
    console.log('final form data', data.value);
  }

  // get single lead details
  getLeadDetails() {
    try {
      this.http
        .request('get', '/lead/' + this.parmsId, null)
        .subscribe((res: any) => {
          this.LeadValues = res.lead;
          console.log(this.LeadValues);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
