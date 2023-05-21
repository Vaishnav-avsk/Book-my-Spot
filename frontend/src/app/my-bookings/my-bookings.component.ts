import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
 
  data:any=[];
  len:any;
  constructor() {

   }

  ngOnInit(): void {
    let data=[];
    for (let i = 0; i < localStorage.length; i++) {

      let business_key = localStorage.key(i);
    
      if(business_key!=null){
       let business_value = localStorage.getItem(business_key);
      if(business_value!=null)
      data.push(JSON.parse(business_value)); 
      }
    }
    this.data=data;
    this.len=this.data.length;
  }


  cancelRes(idx:any){

    let key = localStorage.key(idx);
    if(key!=null)
   localStorage.removeItem(key);
   this.ngOnInit();
   alert('Reservation cancelled!')

  }
  
}
