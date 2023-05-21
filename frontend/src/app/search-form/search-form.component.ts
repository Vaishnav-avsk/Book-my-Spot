import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {




  options: any[]=[];
  isDisabled:any;
  Distance:string="";
  Keyword:string="";
  Location:string="";
  category:string="";
  autoDetect:any;
  latitude:string='';
  longitude:string='';
  yelpData:any;
  displayTable:boolean=false;
  no_data:boolean=false;
  
  moreInfo:any="";

  status:any=false;

  loading:any;

  constructor(private dataService: DataService) {}
  
  

  ngOnInit(): void {
    this.category="All";
    this.autoDetect=false;
    
  }
  

  onInputChange():void{
    
    if(this.Keyword.length>=1){
      this.loading=true;
      this.dataService.getAutoComplete(this.Keyword).subscribe((data:any)=>{
       this.options=data.terms.map((i:any)=>i.text);
       this.loading=false;
       
       for(let i of data.categories){
        this.options.push(i.title)
       }
       //categories.title
      })
    }else{
      this.options=[];
    }
  }
  assignData():void{
    this.dataService.getYelpData(this.Keyword,this.Distance,this.category,this.latitude,this.longitude).subscribe((data:any)=>{
      this.yelpData=data.businesses;
      if(this.yelpData==undefined || this.yelpData.length<1){
        this.no_data=true;
        this.displayTable=false;
      }else{
        this.displayTable=true;
        this.no_data=false;

      }
      this.status=false;
    });
  }
  onSubmit(f:NgForm){
    this.Distance=f.value.Distance;
    if(!this.Distance){
      this.Distance='10';
    }
    this.Keyword=f.value.Keyword;
    this.Location=f.value.Location?f.value.Location:'';
    this.autoDetect=f.value.autoDetect?f.value.autoDetect:false;
    this.category=f.value.category?f.value.category:'All';
  
    // console.log(this.category,this.Keyword,this.Location,this.autoDetect,this.Distance);
    if(this.autoDetect){
      //call ipinfo api
      this.dataService.getCurrentLocation().subscribe((data:any)=>{
        this.latitude= data.loc.split(",")[0];
        this.longitude=data.loc.split(",")[1];
        this.assignData();
      })
    }else{
     //call geomaps api
     this.dataService.getLocationFromIP(this.Location).subscribe((data:any)=>{
      // console.log(data);
      if(data==undefined){
        this.displayTable=false;
        this.no_data=true;
        this.moreInfo=false;
      }else{
        this.no_data=false;
        let coordinates= data.geometry.location;
        this.latitude= coordinates.lat;
        this.longitude=coordinates.lng;
        this.assignData();
      }
     })
    }
    this.options=[];
  
  }
  setDisability(){
    this.isDisabled=!this.isDisabled;
    if(this.isDisabled == true){
     this.Location="";
    }
  }
  clearFields(){
  this.isDisabled=false;
  this.displayTable=false;
  this.status=false;
  this.options=[];
  this.no_data=false;
  }


  handleChildEvent(id:any){

    this.dataService.getMoreInfo(id).subscribe((data:any)=>{
      this.moreInfo=data;
      this.status=true;
    })

  }

  handleOpen(status:any){
   this.status=status;
  }


}
