import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { SearchFormComponent } from './search-form/search-form.component';

const routes: Routes = [
  {path:'search', component:SearchFormComponent},
  {path:'bookings',component:MyBookingsComponent},
  {path: '**', redirectTo: 'search', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
