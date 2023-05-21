import { CommonModule } from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { resulttableModule } from '../result-table/result-table.module';
import { AngularMaterialModule } from '../angular-material.module';


import { SearchFormComponent } from './search-form.component';
import { moreInfoModule } from '../more-info/more-info.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchFormComponent,
  ],
  imports: [
   CommonModule,
   FormsModule,
   CoreModule,
   resulttableModule,
   AngularMaterialModule,
   moreInfoModule,
   RouterModule
  ],
  providers: [],
  exports:[SearchFormComponent]
})

export class searchFormModule { }
