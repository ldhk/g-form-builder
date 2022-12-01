import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CONSTANTS } from '../../common/constants';
import { BaseFieldViewModel, BaseFormBuilderModel } from '../../models';
import * as moment from 'moment';

@Component({
  selector: 'base-component',
  encapsulation: ViewEncapsulation.None,
  template: ''
})
export class GBaseControlComponent implements OnInit, AfterContentInit {
  @Input() fieldConfig: BaseFieldViewModel;
  @Input() frmGroup;
  @Input() rootConfig: BaseFormBuilderModel;
  moment = moment;
  today = this.moment();
  visibilitySubject = new BehaviorSubject(true);
  appearance = CONSTANTS.UI.STANDARD;
  CONSTANTS = CONSTANTS;
  readonly = false;
  isVisibility = true;
  constructor() {}

  get created(): boolean {
    return this.rootConfig.uuid ? true : false;
  }

  get currentValue() {
    return this.fieldConfig.value;
  }

  get formControl(): any {
    return this.frmGroup.controls[this.fieldConfig.name];
  }

  ngOnInit() {
    this.appearance = this.fieldConfig.options.appearance ? this.fieldConfig.options.appearance : CONSTANTS.UI.STANDARD;
    this.subscribeUpdateValue();
    this.visibilitySubscribe();
    this.frmGroup.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.isVisibility = this.checkVisibility();
    });
  }

  ngAfterContentInit(): void {
    this.readonly = this.checkReadOnly();
  }

  subscribeUpdateValue() {
    this.formControl &&
      this.formControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
        this.fieldConfig.value = value ? value : null;
      });
  }

  visibilitySubscribe() {
    this.visibilitySubject.pipe(debounceTime(500),distinctUntilChanged()).subscribe(visibilityValue => {
      if (!visibilityValue) {
        this.formControl.reset();
        this.formControl.disable();
      } else {
        this.formControl.enable();
      }
    });
  }

  checkReadOnly() {
    try {
      if (!this.fieldConfig.options.readonly) {
        return false;
      }

      if (
        this.fieldConfig.options.readonly.depend_on.name &&
        this.fieldConfig.options.readonly.depend_on.name === this.CONSTANTS.CREATED
      ) {
        const condition = this.created;
        return condition;
      } else if (this.fieldConfig.options.readonly.depend_on.condition) {
        let condition = this.fieldConfig.options.readonly.depend_on.condition
          .replaceAll('$form(', 'this.returnFormGroupValue(')
          .replaceAll('$', 'this.');
        return eval(condition);
      } else {
        const result =
          this.frmGroup &&
          this.frmGroup.controls[this.fieldConfig.options.readonly.depend_on.name].value ===
            this.fieldConfig.options.readonly.depend_on.value;
        return result;
      }
    } catch (e) {
      console.error(`Can't execute data for 'readonly': ${e}`);
      return false;
    }
  }

  checkVisibility(): boolean {
    let visibility = null;
    try {
      if (this.fieldConfig.options && this.fieldConfig.options.is_visible) {
        visibility = this.fieldConfig.options.is_visible;
        this.visibilitySubject.next(visibility);
        return visibility;
      }

      if (this.fieldConfig.options && this.fieldConfig.options.is_visible_depend_on) {
        visibility =
          this.frmGroup &&
          this.frmGroup.controls[this.fieldConfig.options.is_visible_depend_on.name].value ===
            this.fieldConfig.options.is_visible_depend_on.value;
        this.visibilitySubject.next(visibility);
        return visibility;
      }
    } catch (e) {
      this.visibilitySubject.next(true);
      console.error(`Can't execute data for 'visibility': ${e}`);
      return true;
    }
    this.visibilitySubject.next(true);
    return true;
  }

  returnFormGroupValue(name) {
    return this.frmGroup.controls[name].value;
  }
}
