import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OpsColorPickerModule } from '@app/common/modules/ops-color-picker/ops-color-picker.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageUploaderModule } from '@app/common/modules/image-uploader/image-uploader.module';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MatSelectInfiniteModule } from '@app/common/modules/mat-select-infinite/mat-select-infinite.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CustomQuillEditorModule } from '@modules/quill-editor/quill-editor.module';

import { GControlMessageComponent } from './components/g-control-message/g-control-message.component';
import { GTextboxControlComponent } from './components/g-textbox-control/g-textbox-control.component';
import { GFormBuilderComponent } from './components/g-form-builder/g-form-builder.component';
import { ComponentGeneratorService } from './services/component-generator.service';
import { FormBuilderService } from './services/form-builder.service';
import { GRepeaterComponent } from './components/g-repeater/g-repeater.component';
import { GControlComponent } from './components/g-control/g-control.component';
import { GControlGroupComponent } from './components/g-control-group/g-control-group.component';
import { DialogControlSettingComponent } from './components/dialog-control-setting/dialog-control-setting.component';
import { DialogFieldConfigComponent } from './components/dialog-field-config/dialog-field-config.component';
import { GColorPickerComponent } from './components/g-color-picker/g-color-picker.component';
import { SafeStylePipe } from './pipe/safe-style.pipe';
import { GImageUploadComponent } from './components/g-image-upload/g-image-upload.component';
import { GBaseControlComponent } from './components/g-base-control/g-base-control.component';
import { GamiSelectInfiniteComponent } from './components/gami-select-infinite/gami-select-infinite.component';
import { GSelectComponent } from './components/g-select/g-select.component';
import { GDatePickerComponent } from './components/g-date-picker/g-date-picker.component';
import { GQuillEditorComponent } from './components/g-quill-editor/g-quill-editor.component';
import { GViewDetailComponent } from './components/g-view-detail/g-view-detail.component';
import { GDialogConfirmComponent } from './components/g-dialog-confirm/g-dialog-confirm.component';


export const MY_CUSTOM_FORMATS = {
  parseInput: 'DD/MM/YYYY HH:mm:ss',
  fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
  datePickerInput: 'DD/MM/YYYY HH:mm:ss',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};
@NgModule({
  declarations: [
    GControlMessageComponent,
    GTextboxControlComponent,
    GFormBuilderComponent,
    GRepeaterComponent,
    GControlComponent,
    GControlGroupComponent,
    DialogControlSettingComponent,
    DialogFieldConfigComponent,
    GColorPickerComponent,
    SafeStylePipe,
    GImageUploadComponent,
    GBaseControlComponent,
    GamiSelectInfiniteComponent,
    GSelectComponent,
    GDatePickerComponent,
    GQuillEditorComponent,
    GViewDetailComponent,
    GDialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    TranslateModule,
    MatExpansionModule,
    MatCheckboxModule,
    OpsColorPickerModule,
    ColorPickerModule,
    ImageUploaderModule,
    NgJsonEditorModule,
    MatSelectInfiniteModule,
    MatSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CustomQuillEditorModule,
    FlexLayoutModule
  ],
  providers: [
    ComponentGeneratorService,
    FormBuilderService],

  entryComponents: [
    GFormBuilderComponent,
    GTextboxControlComponent,
    GControlMessageComponent,
    DialogControlSettingComponent,
    DialogFieldConfigComponent,
    GDialogConfirmComponent,
  ],
  exports: [GFormBuilderComponent, GTextboxControlComponent, GControlMessageComponent, GViewDetailComponent]
})
export class GFormBuilderModule {}
