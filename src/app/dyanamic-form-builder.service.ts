import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DyanamicFormBuilderService {
  constructor() {}

  formBuilder = [
    {
      name: 'text',
      type: 'text',
      inputType: 'text',
      placeholder: '',
      label: '',
      DLabel: 'Text',
      src: 'assets/FontCase.svg',
    },
    {
      name: 'text',
      type: 'email',
      inputType: 'email',
      placeholder: '',
      label: '',
      DLabel: 'Email',
      src: 'assets/email.svg',
    },
    {
      name: 'text',
      type: 'number',
      inputType: 'number',
      placeholder: '',
      label: '',
      DLabel: 'Phone',
      src: 'assets/call.svg',
    },
    {
      name: 'text',
      type: 'textarea',
      inputType: 'textarea',
      placeholder: '',
      label: '',
      DLabel: 'Text Area',
      src: 'assets/chat.svg',
    },
    {
      name: 'drop-down',
      type: 'select',
      inputType: 'select',
      options: [],
      placeholder: 'Select',
      label: '',
      DLabel: 'Dropdown',
      src: 'assets/dropdown.svg',
    },
    {
      name: 'checkbox',
      type: 'checkbox',
      inputType: 'checkbox',
      placeholder: null,
      displayText: 'Check box',
      DLabel: 'CheckBox',
      label: '',
      src: 'assets/check.svg',
    },
    {
      name: 'Date picker',
      type: 'date',
      inputType: 'date',
      placeholder: 'choose date',
      DLabel: 'Date Picker',
      src: 'assets/calendar.svg',
    },
    // {
    //   name: 'text',
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: '',
    //   DLabel: 'Custom Text',
    //   label: '',
    //   src: 'assets/Subtraction-30.svg',
    // },
    {
      name: 'file',
      type: 'file',
      inputType: 'file',
      placeholder: '',
      DLabel: 'File Upload',
      label: '',
      src: 'assets/cloud-computing.svg',
    },
    // {
    //   name: 'text',
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: '',
    //   DLabel: 'Task Duration',
    //   label: '',
    //   src: 'assets/duration.svg',
    // },
    {
      name: 'text',
      type: 'hyperlink',
      inputType: 'text',
      placeholder: '',
      DLabel: 'Hyperlink',
      label: '',
      src: 'assets/hyperlink.svg',
    },
    // {
    //   name: 'text',
    //   type: 'textarea',
    //   inputType: 'textarea',
    //   placeholder: '',
    //   DLabel: 'Comment/Notepad',
    //   label: '',
    //   src: 'assets/chat.svg',
    // },
    {
      name: 'toggle-checkbox',
      type: 'checkbox',
      inputType: 'checkbox',
      placeholder: null,
      displayText: 'Toggle switch',
      DLabel: 'Switch',
      label: '',
      src: 'assets/switch.svg',
    },
    // {
    //   name: 'text',
    //   type: 'text',
    //   inputType: 'text',
    //   placeholder: '',
    //   DLabel: 'Task Versioning',
    //   label: '',
    //   src: 'assets/check.svg',
    // },
    // {
    //   name: 'toggle-checkbox',
    //   type: 'checkbox',
    //   inputType: 'checkbox',
    //   placeholder: null,
    //   displayText: 'Toggle switch',
    //   DLabel: 'Switch',
    //   label: '',
    //   src: 'assets/ringing.svg',
    // },
    // {
    //   name: 'Date range picker',
    //   type: 'date',
    //   inputType: 'date',
    //   placeholder: 'choose date',
    //   DLabel: 'Date Range Picker',
    //   label: '',
    //   src: 'assets/calendar.svg',
    // },
  ];
}