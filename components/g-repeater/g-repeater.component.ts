import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilderService } from '../../services/form-builder.service';
import { BaseFieldViewModel } from '../../models';
import { CONSTANTS } from '../../common/constants';
import { FormArray } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'g-repeater',
  templateUrl: './g-repeater.component.html',
  styleUrls: ['./g-repeater.component.scss']
})
export class GRepeaterComponent implements OnInit {
  @Input() fieldConfig: BaseFieldViewModel;
  @Input() frmGroup;
  @Input() rootConfig;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  CONSTANTS = CONSTANTS;
  constructor(
    private formBuilderService: FormBuilderService,
    public dialog: MatDialog,
    public toastrService: ToastrService
  ) {}

  get formArray(): any {
    return this.frmGroup.controls[this.fieldConfig.name] as FormArray;
  }

  get lengthFormArray(): number {
    return this.formArray.controls.length;
  }

  get isCanAdd(): boolean {
    if (!this.fieldConfig.options || !this.fieldConfig.options.limit) {
      return true;
    }
    if (this.fieldConfig.options && this.fieldConfig.options.limit > this.formArray.controls.length) {
      return true;
    }
    return false;
  }

  get isCanDelete(): boolean {
    if (this.fieldConfig.options && this.fieldConfig.options.default_field < this.formArray.controls.length) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    if (
      this.fieldConfig.value &&
      this.fieldConfig.value.length > 1 &&
      this.fieldConfig.value.length > this.fieldConfig.options.default_field
    ) {
      this.formArray.controls = [];
      this.fieldConfig.value.forEach(() => this.addItemToFormArray());
    }
    this.fieldConfig.value && this.formArray.patchValue(this.fieldConfig.value);
    this.formArray.valueChanges.subscribe(value => {
      this.fieldConfig.value = value;
    });
  }

  addItemToFormArray(reset = false) {
    const frm = this.formBuilderService.generateFormGroup(this.fieldConfig.fields);
    reset && frm.reset();
    this.formArray.push(cloneDeep(frm));
  }

  removeItemToFormArray(index) {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: true,
      data: {}
    });

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.formArray.removeAt(index);
          this.toastrService.success(CONSTANTS.MESSAGES.DELETE_SUCCESS);
        } catch {
          this.toastrService.error(CONSTANTS.MESSAGES.DELETE_ERROR);
        }
      } else {
        this.confirmDialogRef.close();
      }
      this.confirmDialogRef = null;
    });
  }
}
