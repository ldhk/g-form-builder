import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';

@Component({
  selector: 'g-select',
  templateUrl: './g-select.component.html',
  styleUrls: ['./g-select.component.scss']
})
export class GSelectComponent  extends GBaseControlComponent {
  
  constructor() { 
    super();
  }

  ngOnInit(){}

}
