import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  
  @Input() yelpData:any=[];

  @Output() getBusinessId = new EventEmitter<string>();

  moreInfo(value: any) {
    this.getBusinessId.emit(value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
