import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { MoreInfoComponent } from './more-info.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoreInfoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    GoogleMapsModule,
    ReactiveFormsModule

  ],
  providers: [],
  exports: [ MoreInfoComponent ]

})
export class moreInfoModule { }
