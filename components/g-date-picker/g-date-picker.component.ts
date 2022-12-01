import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';
import { MinMaxTypeModel, TypeModel } from '../../models';
@Component({
  selector: 'g-date-picker',
  templateUrl: './g-date-picker.component.html',
  styleUrls: ['./g-date-picker.component.scss']
})
export class GDatePickerComponent extends GBaseControlComponent {
  
  constructor() {
    super();
  }
  
  get minDate() {
    return this.returnMixMaxDate(this.fieldConfig.options, 'min')
  }

  get maxDate() {
    return this.returnMixMaxDate(this.fieldConfig.options, 'max')
  }

  ngOnInit() {
  }

  returnMixMaxDate(options, type: MinMaxTypeModel){
    if (!options[type]) {
      return !this.created && type === 'min' ? this.today : null;
    }
    switch(options[type].type) {
      case this.CONSTANTS.TYPE.CONTROL:
      return this.frmGroup.get(options[type].value).value ? this.frmGroup.get(options[type].value).value : null;
      case this.CONSTANTS.TYPE.DATE: 
      return options[type].value ? options[type].value : null;
      case this.CONSTANTS.TYPE.VALUE:
        let value = options[type].value
          .replace('$form(', 'this.returnFormGroupValue(')
          .replace('$', 'this.');
        return eval(value) ? eval(value) : null;
    }
  }
}
