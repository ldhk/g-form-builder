import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private translateService: TranslationService) { }

  public getValidatorMessage(validatorName: string, validatorValue?: any, name?: string) {
    return this.getErrorMessage(validatorValue, name)[validatorName];
  }

  protected getErrorMessage(validatorValue?: any, name?: string) {
    return {
      required: this.showError('is required', name),
      minlength: this.showError(`Minimum length is ${validatorValue}`),
      maxlength: this.showError(`Maxlength is ${validatorValue.requiredLength}`),
      pattern: this.showError(`is wrong format`, name),
      min: this.showError(`Min is ${validatorValue.min}`),
      max: this.showError(`Max is ${validatorValue.max}`),
      owlDateTimeMin: this.showError(`Min date is ${moment(validatorValue.min).format('DD-MM-YYYY HH:mm:ss')}`),
      owlDateTimeMax: this.showError(`Max date is ${moment(validatorValue.max).format('DD-MM-YYYY HH:mm:ss')}`)
    };
  }

  protected showError(msg: string, name?: string) {
    return name ? `${name} ${msg}` : msg;
  }

  protected showErrorWithTranslateName(msg: string, name: string) {
    return this.translateService.translateWithName(msg, name);
  }

}
