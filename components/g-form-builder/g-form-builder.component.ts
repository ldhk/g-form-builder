import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { validateAllFields } from '../../common/utils';
import { BaseFieldViewModel } from '../../models';
import { CONSTANTS } from '../../common/constants';

import { ComponentGeneratorService } from '../../services/component-generator.service';
import { FormBuilderService } from '../../services/form-builder.service';
import { TranslationService } from '../../services/translation.service';

import { DialogControlSettingComponent } from '../dialog-control-setting/dialog-control-setting.component';

@Component({
  selector: 'app-g-form-builder',
  templateUrl: './g-form-builder.component.html',
  styleUrls: ['./g-form-builder.component.scss']
})
export class GFormBuilderComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() formBuilderData = new EventEmitter();
  frm: FormGroup;
  fieldControls: BaseFieldViewModel[];
  CONSTANTS = CONSTANTS;
  metadata: any;
  initData: any;
  
  constructor(
    protected componentGeneratorService: ComponentGeneratorService,
    protected formBuilderService: FormBuilderService,
    protected translationService: TranslationService,
    public dialog: MatDialog
  ) {}

  private _jsonData = '';
  @Input()
  get jsonData(): any {
    return this._jsonData;
  }
  set jsonData(jsonVal: any) {
    if (!jsonVal) return;

    this._jsonData = jsonVal;
    this.initData = { ...jsonVal.data };
    this.metadata = { ...jsonVal.metadata };
    this.fieldControls = jsonVal.fields;
    this.initFormGroup();
  }

  ngOnInit() {}

  protected initFormGroup() {
    if(!this.fieldControls || this.fieldControls.length == 0) {
      return;
    }
    this.frm = this.formBuilderService.generateDynamicFormGroup(this.fieldControls);

    // patch Data to fromgroup & remove unuse or delete data
    this.frm.patchValue(this.jsonData.data);
    this.jsonData.data = this.formBuilderService.transformFormData(this.frm);

    this.parentForm.controls[this.jsonData.name] = this.frm;
    this.parentForm.updateValueAndValidity();
    this.formBuilderData.emit(this.jsonData);
    this.subscribeFormGroup();
  }


  protected subscribeFormGroup() {
    this.frm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()).subscribe(() => {
      //validateAllFields(this.parentForm);
      this.parentForm.controls[this.jsonData.name] = this.frm;
      this.parentForm.updateValueAndValidity();
      this.jsonData.data = this.formBuilderService.transformFormData(this.frm);
      this.formBuilderData.emit(this.jsonData)
    });
  }

  openDialog(): void {
    const data = cloneDeep(this.jsonData);
    const dialogRef = this.dialog.open(DialogControlSettingComponent, {
      data: data,
      panelClass: 'new-ui-view-detail'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result)
        return;
      this.jsonData = {...result};
      this.initFormGroup();
    });
  }
}

