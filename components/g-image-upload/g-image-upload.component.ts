import { Component } from '@angular/core';
import { IMAGE_LIMIT_SIZE } from '@app/pages/loyalty/common/constant';
import { AppConstant } from '@app/common/services';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';
@Component({
  selector: 'g-image-upload',
  templateUrl: './g-image-upload.component.html',
  styleUrls: ['./g-image-upload.component.scss']
})
export class GImageUploadComponent extends GBaseControlComponent {
  
  constructor() { 
    super();
  }

  get imageDomain():string {
    return this.fieldConfig.metadata.image_domain || AppConstant.domain.gamification;
  }

  get imageEndPoint():string {
    return this.fieldConfig.metadata.image_endpoint || AppConstant.gamificationImageUrl;
  }

  get limitSize():string {
    return this.fieldConfig.metadata.limitsize || IMAGE_LIMIT_SIZE.LIMIT_400KB;
  }

  onChangeImage(event) {
    this.formControl.setValue(event);
    this.formControl.markAsDirty();
  }

}
