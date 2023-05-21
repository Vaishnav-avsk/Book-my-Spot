import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';


declare var $: any;

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MoreInfoComponent implements OnInit {


  @Input() data:any;
  
  @Output() OpenWindow= new EventEmitter<string>();

  open:any=true;

  registerForm:any;

minDate=new Date().getFullYear() + "-" +  (new Date().getMonth() + 1 ) + "-" + (new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate());

submitted=false;
Email:any;
Date:any;
Hours:any;
Minutes:any;
reserve:boolean=false;

  Address:any='';
  Category:any='';
  Phone:any='';
  Price:any='';
  Status:any='';
  color:any='';
  p1:any='';
  p2:any='';
  p3:any='';
  id:any='';
  lat:number=0;
  lng:number=0;

  mapOptions:any;
  marker:any;
  

  reviews:any=[];
  constructor(private dataService: DataService,private formBuilder:FormBuilder) {
   }

  ngOnInit(): void {
     console.log('data',this.data);
     this.setData();
     this.getReviews();
     this.isReserved()
     this.registerForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      date:['',[Validators.required]],
      hours:['',[Validators.required]],
      minutes:['',[Validators.required]]
    });
  
  }

  get email() {
    return this.registerForm.get('email');
  }
 
  get date() {
    return this.registerForm.get('date');
  }
 
  get hours() {
    return this.registerForm.get('hours');
  }

  get minutes(){
    return this.registerForm.get('minutes');

  }

  isReserved(){

    if(localStorage.getItem(this.id) == null){
      this.reserve=false;
    }
    else{
      this.reserve=true;
    }
    
  }

  cancelRes(){
    let id=this.id;
   localStorage.removeItem(id);
   alert('Reservation cancelled!')
   this.reserve=false;

  }
  onSubmitt() { 
    this.submitted = true;
    
    if (this.registerForm.invalid) {
        return;
    }
    else{
      this.reserve=true;
      alert("Reservation created!")
      this.Email=this.registerForm.get('email')?.value
      this.Date=this.registerForm.get('date')?.value
      this.Hours=this.registerForm.get('hours')?.value
      this.Minutes=this.registerForm.get('minutes')?.value
      let id=this.id;

      
      let bookings={
        'name':this.data.name,
        'Email':this.Email,
        'Date':this.Date,
        'Hours':this.Hours,
        'Minutes':this.Minutes
      
    }
    localStorage.setItem(id,JSON.stringify(bookings));
  
        
        $("#infoModal .close").click()

    }

}

  
 
  
  setData(){
    this.id= this.data.id;
    this.Address=this.data.location.display_address?this.data.location.display_address.join(' '):'';
    
    this.Category=this.data.categories? this.data.categories.map((a:any)=>a.title).join(' | '):'';

    this.Status=this.data.hours ? (this.data.hours[0].is_open_now?'Open Now':'Closed') : '';
  
    if(this.Status=='Open Now'){
      this.color='green';
    }
    else{
      this.color='red';
    }
    this.Price=this.data.price ? this.data.price :'';

    this.Phone=this.data.display_phone? this.data.display_phone : ''; 

    this.p1=this.data.photos[0]?this.data.photos[0]:'https://s24.q4cdn.com/143307695/files/images/newsroom/2022/Burst-Q4.jpg';
    this.p2=this.data.photos[1]?this.data.photos[1]:'https://s24.q4cdn.com/143307695/files/images/newsroom/2022/Burst-Q4.jpg';
    this.p3=this.data.photos[2]?this.data.photos[2]:'https://s24.q4cdn.com/143307695/files/images/newsroom/2022/Burst-Q4.jpg';
    
    // console.log(this.p1)
    this.lat=this.data.coordinates.latitude;
    this.lng=this.data.coordinates.longitude;

    // console.log(this.lat,this.lng);
  
//     console.log(typeof(this.lat));
 
this.mapOptions={
    center: { lat: this.lat, lng: this.lng  },
    zoom : 14
 }

   this.marker = {
    position: { lat: this.lat, lng: this.lng  },
 }
  }

  setResultActive(){
    this.open=!this.open;
    
  }

  moreInfo() {
    this.open=false;
    this.OpenWindow.emit(this.open);
  }


  getReviews(){
    this.dataService.getBusinessReviews(this.data.id).subscribe(data=>{
      this.reviews=data.reviews;
    })
  }
}

