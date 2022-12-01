import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTS } from '../../common/constants';
import { BaseFieldViewModel } from '../../models';

@Component({
  selector: 'g-control-group',
  templateUrl: './g-control-group.component.html',
  styleUrls: ['./g-control-group.component.scss']
})
export class GControlGroupComponent implements OnInit {
  @Input() fieldConfig: BaseFieldViewModel;
  @Input() frmGroup;
  @Input() rootConfig;

  appearance = CONSTANTS.UI.STANDARD;
  CONSTANTS = CONSTANTS;

  get formControl(): any {
    return this.frmGroup.controls[this.fieldConfig.name];
  }

  constructor() {
  } 
  ngOnInit() {
    if(this.fieldConfig.name !== CONSTANTS.CONTROL_TYPE.REPEATER){
      this.formControl && this.formControl.valueChanges.subscribe((value) => {
        this.fieldConfig.value = value
      })
    }
  }
}
