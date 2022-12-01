import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';

@Component({
  selector: 'g-color-picker',
  templateUrl: './g-color-picker.component.html',
  styleUrls: ['./g-color-picker.component.scss']
})

export class GColorPickerComponent extends GBaseControlComponent {
  options: any;
  toggle: boolean = false;

  constructor() {
    super();
    this.options = {
      format: 'hex',
      position: 'bottom',
      positionOffset: '80%',
      saveClickOutside: true
    };
  }

  get backgroundColorCSS(): string {
    return `background-color: ${this.formControl.value}!important`;
  }

  ngOnInit() {}
}
