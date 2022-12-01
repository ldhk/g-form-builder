import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTS } from '../../common/constants';

@Component({
  selector: 'g-view-detail',
  templateUrl: './g-view-detail.component.html',
  styleUrls: ['./g-view-detail.component.scss']
})
export class GViewDetailComponent implements OnInit {
  @Input() dataFields; 
  CONSTANTS = CONSTANTS;
  
  constructor() { }
  ngOnInit() {
  }

}
