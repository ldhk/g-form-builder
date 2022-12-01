import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFieldModel } from '@loyalty/common/module/g-form-builder/models/base-model';
import { CONSTANTS, SPECIAL_CONTROL_TYPE } from '@loyalty/common/module/g-form-builder/common/constants'

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  constructor() {}

  protected returnValueField(field: BaseFieldModel) {
    return field.value || field.default_value || null;
  }

  protected returnValidator(field: BaseFieldModel) {
    let validators = [];

    validators = field.validators.map(config => {
      switch (config.name) {
        case CONSTANTS.VALIDATOR_TYPE.MAXLENGTH:
          return Validators.maxLength(config.value);
        case CONSTANTS.VALIDATOR_TYPE.PATTERN:
          return Validators.pattern(config.pattern);
        case CONSTANTS.VALIDATOR_TYPE.MIN:
          return Validators.min(config.value);
        case CONSTANTS.VALIDATOR_TYPE.MAX:
            return Validators.max(config.value);
        default:
          break;
      }
    });

    if(field.required) {
      validators.push(Validators.required)
    }

    return validators;
  }

  public generateFormControl(field) {
    return new FormControl(this.returnValueField(field), this.returnValidator(field));
  }

  public generateFormGroup(fields) {
    const formGroup: any = {};

    fields.forEach(field => {
      const control = this.generateFormControl(field);
      formGroup[field.name] = control;
    });

    return new FormGroup(formGroup);
  }

  public generateFormArray(field) {
    let formArray = [];
    let key = 1;
    
    if(field.options && field.options.default_field) {
      key = field.options.default_field;
    }

    for (const i of Array(key).keys()) {
      const formGroup = this.generateFormGroup(field.fields);
      formArray.push(formGroup)
    }

    return new FormArray(formArray);
  }

  public generateDynamicFormGroup(fields) {
    const formGroup: any = {};

    fields.forEach(field => {
      switch(field.type){
        case CONSTANTS.CONTROL_TYPE.GROUP:
          formGroup[field.name] = this.generateFormGroup(field.fields);
          break;
        case CONSTANTS.CONTROL_TYPE.REPEATER:
          formGroup[field.name] = this.generateFormArray(field);
          break;
        default:
          formGroup[field.name] = this.generateFormControl(field);
          break;
      }
    });

    return new FormGroup(formGroup);
  }

  updateFormToParent(formGroup, parentForm, nameformGroup) {
    parentForm.controls[nameformGroup] = formGroup;
    parentForm.updateValueAndValidity();
  }

  pushControlToFormGroup(field, formGroup){
    formGroup.controls[field.name] = this.generateFormControl(field)
  }

  transformFormData(formGroup: FormGroup){
    return formGroup.getRawValue();
  }

}
