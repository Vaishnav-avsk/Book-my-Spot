
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyBookingsComponent } from './my-bookings.component';

@NgModule({
  declarations: [
    MyBookingsComponent,
  ],
  imports: [
   CommonModule,
   RouterModule
  ],
  providers: [],
  exports:[MyBookingsComponent]
})

export class MyBookingsModule { }
