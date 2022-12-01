import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from '@loyalty/common/module/g-form-builder/services/validator.service';
@Component({
  selector: 'g-control-message',
  templateUrl: './g-control-message.component.html',
  styleUrls: ['./g-control-message.component.scss']
})
export class GControlMessageComponent implements OnInit {
  @Input() control: FormControl;
  @Input() name: string;
  constructor(private validatorService: ValidatorService) { }

  ngOnInit() {
  }

  get errorMessage(): string {
    if(!this.control || !this.control.errors)
      return null;
    for(const propertyName in this.control.errors) {
      if(this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        return this.validatorService.getValidatorMessage(propertyName,this.control.errors[propertyName],this.name)
      }
    }
    return null;
  }


}
