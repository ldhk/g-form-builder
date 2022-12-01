import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

import { DialogFieldConfigComponent } from '../dialog-field-config/dialog-field-config.component';
import { CONTROL_TYPE_CONFIG, SPECIAL_CONTROL_TYPE, CONSTANTS } from '../../common/constants';
import { BaseFormBuilderModel, BaseFieldViewModel, ActionTypeModel, ControlTypeModel } from '../../models'

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'dialog-control-setting',
  templateUrl: './dialog-control-setting.component.html',
  styleUrls: ['./dialog-control-setting.component.scss']
})
export class DialogControlSettingComponent implements OnInit {
  CONTROL_TYPE_CONFIG = CONTROL_TYPE_CONFIG;
  SPECIAL_CONTROL_TYPE = SPECIAL_CONTROL_TYPE;
  CONSTANTS = CONSTANTS;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  menuItemField = Object.keys(CONTROL_TYPE_CONFIG)

  constructor(
    public dialogRef: MatDialogRef<DialogControlSettingComponent>,
    public dialog: MatDialog,
    public toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: BaseFormBuilderModel,
  ) { }
  
  ngOnInit() {}

  drop(event: CdkDragDrop<string[]>, targetSource: BaseFieldViewModel[]) {
    moveItemInArray(targetSource, event.previousIndex, event.currentIndex);
  }

  removeField(targetSource: BaseFieldViewModel[], field: BaseFieldViewModel){

    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: true,
      data: {}
    });

    this.confirmDialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          try {
            const index = targetSource.findIndex(source => source.name === field.name);
            targetSource.splice(index,1);
            // const indexData = this.data[targetSource.name].findIndex(source => source.name === field.name);
            // targetSource.splice(index,1);
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

  addField(type: ControlTypeModel, parent: BaseFieldViewModel, actionType: ActionTypeModel, field?: BaseFieldViewModel): void {
    const dialogConfigRef = this.dialog.open(DialogFieldConfigComponent, {
      data: {
        type: type,
        parent: parent,
        action: actionType,
        field: field,
      },
      panelClass: 'dialog-field-config',
      disableClose: true,
    });

    dialogConfigRef.afterClosed().subscribe(result => {
      if(!result)
        return;
      
      if(result.action === CONSTANTS.ACTION_TYPE.CREATE) {
        parent.fields.push(result.field)
      }

      if(result.action === CONSTANTS.ACTION_TYPE.EDIT && result.field) {
        const index = parent.fields.findIndex(f => f.name === result.field.name);
        if(index < 0){
          this.toastrService.error(CONSTANTS.MESSAGES.CREATE_ERROR)
          return;
        }
        
        parent.fields[index] = new BaseFieldViewModel({...result.field});
      }

      this.toastrService.success(CONSTANTS.MESSAGES.SUCCESS)
    });
  }

  isSpecialField(type) {
    return SPECIAL_CONTROL_TYPE.includes(type);
  }
}
