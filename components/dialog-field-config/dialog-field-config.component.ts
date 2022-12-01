import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { BaseFieldModel, ValidatorModel, DialogFieldConfigModel } from '../../models';
import { CONTROL_DEFAULT_SETTING, CONSTANTS, CONTROL_TYPE_CONFIG } from '../../common/constants';
import { validateAllFields } from '../../common/utils';
import { GDialogConfirmComponent } from '../g-dialog-confirm/g-dialog-confirm.component';
@Component({
  selector: 'dialog-field-config',
  templateUrl: './dialog-field-config.component.html',
  styleUrls: ['./dialog-field-config.component.scss']
})
export class DialogFieldConfigComponent implements OnInit {
  @ViewChild('optionsJsonEditor', { read: false }) optionsJsonEditor: JsonEditorComponent;
  formFieldConfig: FormGroup;
  CONSTANTS = CONSTANTS;
  isCreate = this.data.action === CONSTANTS.ACTION_TYPE.CREATE;
  isEdit = this.data.action === CONSTANTS.ACTION_TYPE.EDIT;
  isGroup = this.data.type === CONSTANTS.CONTROL_TYPE.GROUP;
  isRepeater = this.data.type === CONSTANTS.CONTROL_TYPE.REPEATER;
  jsonEditorOptions = new JsonEditorOptions();

  constructor(
    public dialogConfigRef: MatDialogRef<DialogFieldConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFieldConfigModel,
    public toastrService: ToastrService,
    public dialog: MatDialog,
  ) {
    this.initFrm();
    this.jsonEditorOptions.mode = 'text';
  }

  get typeTitle(): string {
    return CONTROL_TYPE_CONFIG[this.formFieldConfig.controls.type.value].LABEL;
  }
  get typeControl(): string {
    return this.formFieldConfig.controls.type.value.toUpperCase();
  }

  ngOnInit() {}

  initFrm() {
    const CONTROL_CONFIG = {
      type: new FormControl(this.data.type, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      default_value: new FormControl(''),
      required: new FormControl(false),
      metadata: new FormGroup({
        label: new FormControl(''),
        col: new FormControl(12, [Validators.required, Validators.min(1), Validators.max(12)])
      }),
      options: new FormControl({})
    };
    this.formFieldConfig = new FormGroup(CONTROL_CONFIG);

    if (this.isCreate) {
      this.formFieldConfig.patchValue(CONTROL_DEFAULT_SETTING[this.typeControl]);
    } else {
      this.formFieldConfig.patchValue(this.data.field);
    }

    if (this.isGroup) {
      this.formFieldConfig.controls.default_value && this.formFieldConfig.removeControl('default_value');
      this.formFieldConfig.controls.required && this.formFieldConfig.removeControl('required');
    }
  }

  transformData() {
    let { validators = [] } = CONTROL_DEFAULT_SETTING[this.typeControl];
    let mergedValidators: ValidatorModel[] = [];

    if (this.isEdit) {
      mergedValidators = [
        ...this.data.field.validators,
        ...validators.filter(
          (v: ValidatorModel) => !this.data.field.validators.some((v2: ValidatorModel) => v2.name === v.name)
        )
      ];
    }

    let transformField = {
      ...this.formFieldConfig.value,
      validators: this.isEdit ? mergedValidators : validators,
      value: this.isEdit && this.data.field.value ? this.data.field.value : null
    };

    if (this.isGroup || this.isRepeater) {
      transformField = { ...transformField, fields: this.isCreate ? [] : this.data.field.fields };
    }

    if (
      this.isEdit &&
      this.isRepeater &&
      transformField.value &&
      transformField.options &&
      transformField.options.limit &&
      transformField.options.limit <= transformField.value.length
    ) {
      transformField.value.length = transformField.options.limit;
    }

    return transformField;
  }

  onCreate() {
    validateAllFields(this.formFieldConfig);
    if (this.formFieldConfig.invalid) {
      this.toastrService.error(CONSTANTS.MESSAGES.FORM_INVALID);
      return;
    }

    if (
      this.isCreate &&
      this.data.parent.fields.findIndex(field => field.name === this.formFieldConfig.value.name) >= 0
    ) {
      this.toastrService.error(CONSTANTS.MESSAGES.DUPLICATE_FIELD_NAME);
      return;
    }
    
    if (!this.isValidOptionsJsonEditor()) {
      this.toastrService.error(CONSTANTS.MESSAGES.OPTION_ERROR);
      return;
    }

    if (this.isRepeater && this.formFieldConfig.value.options) {
      if(!this.formFieldConfig.value.options.default_field || !this.formFieldConfig.value.options.limit) {
        this.toastrService.error(CONSTANTS.MESSAGES.REPEATER_ERR2);
        return;
      }
        
      if(this.formFieldConfig.value.options.default_field > this.formFieldConfig.value.options.limit) {
        this.toastrService.error(CONSTANTS.MESSAGES.REPEATER_ERR1);
        return;
      }
    }

    this.dialogConfigRef.close({
      field: new BaseFieldModel(this.transformData()),
      action: this.data.action
    });
  }

  onClose() {
    this.dialogConfigRef.close(false);
  }

  isValidOptionsJsonEditor(): boolean {
    try {
      const optionJsonData = this.optionsJsonEditor.get();
      return true;
    } catch (err) {
      return false;
    }
  }

  setDefaultOptions() {
    const confirmDialogRef = this.dialog.open(GDialogConfirmComponent, {
      disableClose: true,
      width: '25%',
      data: {
        title: CONSTANTS.MESSAGES.CONFIRM_MESSAGE,
        content: ''
      },
      panelClass: 'dialog-confirm',
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formFieldConfig.controls.options.setValue(CONTROL_DEFAULT_SETTING[this.typeControl].options)
      } else {
        confirmDialogRef.close();
      }
    });
    
  }
}
