import { Component } from '@angular/core';
import { dataToken } from '@app/common/modules/mat-select-infinite/mat-select-infinite.component';
import { GamificationService } from '@app/pages/loyalty/gamification/campaign-management/services';
import { GBaseControlComponent } from '../g-base-control/g-base-control.component';
import { CONSTANTS } from '../../common/constants';
@Component({
  selector: 'gami-select-infinite',
  templateUrl: './gami-select-infinite.component.html',
  styleUrls: ['./gami-select-infinite.component.scss'],
  providers: [{ provide: dataToken, useClass: GamificationService }]
})
export class GamiSelectInfiniteComponent extends GBaseControlComponent {
  searchQueryKey = 'id';
  CONSTANTS = CONSTANTS;
  constructor() {
    super();
   }

  ngOnInit() {
    if(!this.fieldConfig.options)
      return;
    this.searchQueryKey = this.fieldConfig.options.init_query_key || 'id';
    this.setQueryKeyAfterInit()
    this.visibilitySubscribe();
  }

  setQueryKeyAfterInit(){
    const timeout = setTimeout(() => {
      this.searchQueryKey = this.fieldConfig.options.after_init_query_key;
      clearTimeout(timeout);
    }, 2000);
  }

}
