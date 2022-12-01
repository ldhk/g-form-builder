import { uuid } from '../common/utils';
import { CONSTANTS } from '../common/constants';
export class BaseFormBuilderModel {
  name?: string;
  fields: BaseFieldModel[];
  data: any;
  metadata: any;
  uuid: string;
  constructor(entity) {
    this.name = entity.name || 'extra_config';
    this.fields = entity.fields || [];
    this.data = entity.data || null;
    this.metadata = entity.metadata || null;
    this.uuid = entity.uuid || uuid();
  }
}

export class BaseFieldModel {
    type: string;
    name: string;
    default_value?: string | number | object ;
    validators?: ValidatorModel[];
    options?: any | undefined | JSON | BaseOptionModel;
    metadata?: any | TextInputMetadata;
    fields?: any | BaseFieldViewModel[];
    required?: boolean;
    value?: any;
    constructor(entity) {
    this.type = entity.type || null;
    this.name = entity.name || null;
    this.default_value = entity.default_value || null;
    this.options = entity.options || null;;
    this.validators = entity.validators || [];
    this.type = entity.type || null;
    this.metadata = entity.metadata || {};
    this.fields = entity.fields || [];
    this.required = entity.required || false;
    this.value = entity.value || null;
  }
}


export class DataModel {
  name?: string;
  value?: string | number | Date | boolean;
}

export class ValidatorModel {
  name: string;
  value?: any;
  pattern?: any;
}

export interface TextInputMetadata {
  label?: string;
}

export class BaseFieldViewModel extends BaseFieldModel {
    uuid?: string;
    constructor(entity) {
      super(entity)
      this.uuid = entity.uuid || uuid();
    }
}

export type ActionTypeModel = typeof CONSTANTS.ACTION_TYPE[keyof typeof CONSTANTS.ACTION_TYPE];
export type ControlTypeModel = typeof CONSTANTS.CONTROL_TYPE[keyof typeof CONSTANTS.CONTROL_TYPE];
export type MinMaxTypeModel = 'min' | 'max';
export type TypeModel = typeof CONSTANTS.TYPE[keyof typeof CONSTANTS.TYPE];
export interface DialogFieldConfigModel {
  type: ControlTypeModel,
  parent: BaseFieldViewModel,
  action: ActionTypeModel,
  field: BaseFieldViewModel,
}
export class DependOnModel {
  name?: string;
  value?: string | number;
  condition: string;
};

export class ReadonlyModel {
  depend_on: DependOnModel;
};

export class BaseOptionModel {
  is_visible: boolean;
  readonly: ReadonlyModel;
  is_visible_depend_on: DependOnModel
}

