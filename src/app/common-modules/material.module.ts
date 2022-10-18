import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material inports
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card'; // used for supply search filter 
import { MatTabsModule } from '@angular/material/tabs';// use for supply search filter 
import { MatCheckboxModule } from '@angular/material/checkbox';// use for bulk notification
import { MatSlideToggleModule } from '@angular/material/slide-toggle';// use for bul notification
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog'; // for supply
import { ScrollingModule } from '@angular/cdk/scrolling'; // scrolling for supply
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // autoComplete for supply and reuisition add page
import { MatSliderModule } from '@angular/material/slider'; // slider for filter page 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // used for dashboard page
import {MatDividerModule} from '@angular/material/divider';
//extra
import { MatFormFieldModule } from '@angular/material/form-field';
//badge
import { MatBadgeModule } from '@angular/material/badge';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";


const moduleList = [
 
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
  MatRadioModule,
  MatCardModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatDialogModule,
  ScrollingModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  

]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    moduleList
  ],
  exports: [moduleList]
})
export class MaterialModule { }
