import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';

@Component({
  selector: 'g-textbox-control',
  templateUrl: './g-textbox-control.component.html',
  styleUrls: ['./g-textbox-control.component.scss']
})
export class GTextboxControlComponent extends GBaseControlComponent {
  
  constructor() { 
    super();
  }

}
