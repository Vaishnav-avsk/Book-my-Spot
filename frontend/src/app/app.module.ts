import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { searchFormModule } from './search-form/search-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyBookingsModule } from './my-bookings/my-bookings.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    searchFormModule,
    BrowserAnimationsModule,
    MyBookingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
