import { Component } from '@angular/core';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';
import { AppConstant } from '@common/services';

@Component({
  selector: 'g-quill-editor',
  templateUrl: './g-quill-editor.component.html',
  styleUrls: ['./g-quill-editor.component.scss']
})
export class GQuillEditorComponent extends GBaseControlComponent {
  constructor() { 
    super();
  }
  domain = AppConstant.domain.gamification;
  urlUploadImage = AppConstant.gamificationImageUrl;
  
  ngOnInit() {
  }

}
