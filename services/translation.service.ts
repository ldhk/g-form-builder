import { Injectable } from '@angular/core';
import { handleParams } from '../common/utils'
@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  public parseValue(value: any, params: any): string | any {
    if (params) return handleParams(value, params);
    return value;
  }

  public translateWithName(msg: any, name: any){
    return this.parseValue(msg, {
      fieldName: name
    });
  }
}
