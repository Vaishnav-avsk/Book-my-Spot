import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultTableComponent } from './result-table.component';

@NgModule({
  declarations: [
    ResultTableComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [ ResultTableComponent ]

})
export class resulttableModule { }
