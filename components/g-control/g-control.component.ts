import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';

@Component({
  selector: 'g-control',
  templateUrl: './g-control.component.html',
  styleUrls: ['./g-control.component.scss']
})
export class GControlComponent extends GBaseControlComponent {
  constructor() { 
    super();
  }
}
