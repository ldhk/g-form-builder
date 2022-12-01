import { CONFIG_CONST } from '@pages/loyalty/common/constant';
import { LoyaltyUtilities } from '@app/pages/loyalty/common/utilities';

export const CONSTANTS = {
    CONTROL_TYPE: {
        TEXT: 'text',
        NUMBER: 'number',
        TEXTAREA: 'textarea',
        QUILL_EDITOR: 'quill_editor',
        DATE_PICKER: 'date_picker',
        IMAGE: 'image',
        SELECT: 'select',
        REPEATER: 'repeater',
        GROUP: 'group',
        LINK: 'link',
        COLOR: 'color',
        GAMI_INFINITE_SELECTION: 'gami_infinite_selection'
    },
    VALIDATOR_TYPE: {
        REQUIRED: 'required',
        MAXLENGTH: 'maxlength',
        PATTERN: 'pattern',
        MIN: 'min',
        MAX: 'max'
    },
    MESSAGES: {
        DELETE: "Are you sure to delete {{fieldName}}?",
        DELETE_SUCCESS: 'Delete Success',
        DELETE_ERROR: 'Error when delete field',
        DUPLICATE_FIELD_NAME: 'Field Name is duplicate, please choose another name',
        SUCCESS: 'Success',
        FORM_INVALID: 'Please complete all form field.',
        CREATE_ERROR: 'Error when create field.',
        OPTION_ERROR: 'Options data is not valid.',
        FIELD_REQUIRED: 'This field is required',
        REPEATER_ERR1: `Default field can't not greater than 'limit'`,
        REPEATER_ERR2: `Required 'default_field' & 'limit' param in Options field`,
        CONFIRM_MESSAGE: 'Are you sure to confirm?',
    },
    ACTION_TYPE: {
        CREATE: 'CREATE',
        EDIT: 'EDIT',
        DELETE: 'DElETE',
    },
    LABEL: {
        CREATE_FIELD: 'Create Field',
        TYPE: 'Type',
        NAME: 'Name',
        DEFAULT_VALUE: 'Default Value',
        LABEL: 'Label',
        REQUIRED: 'Required',
        CANCEL: 'Cancel',
        CREATE: 'Create',
        ADD: 'Add',
        SETTING: 'Setting',
        OPTIONS: 'Options',
        UPDATE: 'Update',
        DEFAULT_OPTIONS: 'Default Options',
        COL:'Column',
        LAYOUT: 'Layout',
    },
    ICON: {
        ADD: 'add',
        DELETE: 'delete'
    },
    UI: {
        OUTLINE: 'outline',
        STANDARD: 'standard'
    },
    CREATED: 'created',
    NEW: 'new',
    TYPE: {
        CONTROL: 'control',
        VALUE: 'value',
        DATE: 'date'
    }
}
export const VALIDATORS_COMMON = {
    REQUIRED: {
        name: 'required'
    },
    TEXT_MAX_LENGTH: {
        name: 'maxlength',
        value: CONFIG_CONST.OTHER.MAX_LENGTH
    },
    CODE_MAX_LENGTH: {
        name: 'maxlength',
        value: CONFIG_CONST.CODE.MAX_LENGTH
    },
    CODE_PATTERN: {
        name: 'pattern',
        pattern: CONFIG_CONST.CODE.PATTERN
    },
    COLOR_FORMAT: {
        name: 'pattern',
        pattern: CONFIG_CONST.COLOR_PICKER.PATTERN
    },
    MAX_AMOUNT: {
        name: 'max',
        value: 999999999999
    },
    TEXTAREA_MAX_LENGTH: {
        name: 'maxlength',
        value: CONFIG_CONST.TEXT_AREA.MAX_LENGTH
    },
    DEEPLINK_PATTERN: {
        name: 'pattern',
        pattern: /^([a-zA-Z0-9]+):\/\/[a-zA-Z0-9]+/
    }
}

export const CONTROL_DEFAULT_SETTING = {
    TEXT: {
        type: CONSTANTS.CONTROL_TYPE.TEXT,
        name: `${CONSTANTS.CONTROL_TYPE.TEXT}_`,
        default_value: '',
        validators: [VALIDATORS_COMMON.TEXT_MAX_LENGTH],
        options: {},
        metadata: {
            col: 12,
            label:'Text Label',
          }
    },
    NUMBER: {
        type: CONSTANTS.CONTROL_TYPE.NUMBER,
        name: `${CONSTANTS.CONTROL_TYPE.NUMBER}_`,
        default_value: null,
        validators: [VALIDATORS_COMMON.MAX_AMOUNT],
        options: {},
        metadata: {
            col: 12,
            label:'Number Label',
          }
    },
    GROUP: {
        type: CONSTANTS.CONTROL_TYPE.GROUP,
        name: `${CONSTANTS.CONTROL_TYPE.GROUP}_`,
        fields: [],
        options: {},
        metadata: {
            col: 12,
            label:'Group Label',
          }
    },
    COLOR: {
        type: CONSTANTS.CONTROL_TYPE.COLOR,
        name: `${CONSTANTS.CONTROL_TYPE.COLOR}_`,
        default_value: '#FFFFFF',
        validators: [VALIDATORS_COMMON.COLOR_FORMAT],
        options: {},
        metadata: {
            col: 12,
            label:'Color Label',
          }
    },
    IMAGE: {
        type: CONSTANTS.CONTROL_TYPE.IMAGE,
        name: `${CONSTANTS.CONTROL_TYPE.IMAGE}_`,
        default_value: null,
        validators: [],
        options: {},
        metadata: {
            col: 12,
            label:'Image Label',
          }
    },
    GAMI_INFINITE_SELECTION: {
        type: CONSTANTS.CONTROL_TYPE.GAMI_INFINITE_SELECTION,
        name: `${CONSTANTS.CONTROL_TYPE.GAMI_INFINITE_SELECTION}_`,
        default_value: null,
        validators: [],
        metadata: {
            col: 12,
            label:'Gami Select Label',
        },
        options: {
            init_query_key: 'id',
            after_init_query_key: 'code',
            value_type: 'number',
            additional_params: {},
            service_name: 'getCampaign',
            bind_key: 'id',
            bind_name: 'name',
            custom_bind_key: 'id',
            placeholder: '',
            validate_message: CONSTANTS.MESSAGES.FIELD_REQUIRED
        }
    },
    SELECT: {
        type: CONSTANTS.CONTROL_TYPE.SELECT,
        name: `${CONSTANTS.CONTROL_TYPE.SELECT}_`,
        default_value: null,
        validators: [],
        required: false,
        metadata: {
            col: 12,
            label:'Select Label',
        },
        options: {
            options: [{ value: 'ACTIVE', name: 'Active' }, { value: 'INACTIVE', name: 'InActive' }]
        }
    },
    DATE_PICKER: {
        type: CONSTANTS.CONTROL_TYPE.DATE_PICKER,
        name: `${CONSTANTS.CONTROL_TYPE.DATE_PICKER}_`,
        default_value: null,
        validators: [],
        required: false,
        metadata: {
            col: 12,
            label:'Date Label',
        },
        options: {
            min: {
                type: 'date',
                value: LoyaltyUtilities.startAt()
            },
            max: {
                type: 'date',
                value: LoyaltyUtilities.endAt(LoyaltyUtilities.startAt())
            }
        }
    },
    TEXTAREA: {
        type: CONSTANTS.CONTROL_TYPE.TEXTAREA,
        name: `${CONSTANTS.CONTROL_TYPE.TEXTAREA}_`,
        default_value: '',
        validators: [VALIDATORS_COMMON.TEXTAREA_MAX_LENGTH],
        options: {},
        metadata: {
            col: 12,
            label:'Textarea Label',
          }
    },
    QUILL_EDITOR: {
        type: CONSTANTS.CONTROL_TYPE.QUILL_EDITOR,
        name: `${CONSTANTS.CONTROL_TYPE.QUILL_EDITOR}_`,
        default_value: '',
        validators: [VALIDATORS_COMMON.TEXTAREA_MAX_LENGTH],
        options: {},
        metadata: {
            col: 12,
            label:'Quill Editor Label',
          }
    },
    REPEATER: {
        type: CONSTANTS.CONTROL_TYPE.REPEATER,
        name: `${CONSTANTS.CONTROL_TYPE.REPEATER}_`,
        fields: [],
        default_value: '',
        validators: [],
        options: {
            default_field: 1,
            limit: 10
        },
        metadata: {
            col: 12,
            label:'Repeater Label',
          }
    },
    LINK: {
        type: CONSTANTS.CONTROL_TYPE.LINK,
        name: `${CONSTANTS.CONTROL_TYPE.LINK}_`,
        default_value: '',
        validators: [VALIDATORS_COMMON.TEXTAREA_MAX_LENGTH],
        options: {},
        metadata: {
            col: 12,
            label:'Deeplink Label',
          }
    },
}

export const SPECIAL_CONTROL_TYPE = [CONSTANTS.CONTROL_TYPE.GROUP, CONSTANTS.CONTROL_TYPE.REPEATER];

export const CONTROL_TYPE_CONFIG = {
    [CONSTANTS.CONTROL_TYPE.TEXT]: {
        ICON:'abc',
        LABEL: 'Text',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.NUMBER]: {
        ICON:'123',
        LABEL: 'Number',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.IMAGE]: {
        ICON:'image',
        LABEL: 'Image',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.COLOR]: {
        ICON:'colorize',
        LABEL: 'Color Picker',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.SELECT]: {
        ICON:'check_circle',
        LABEL: 'Select',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.DATE_PICKER]: {
        ICON:'calendar_month',
        LABEL: 'Date Picker',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.GROUP]: {
        ICON:'reorder',
        LABEL: 'Group',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.TEXTAREA]: {
        ICON:'text_snippet',
        LABEL: 'Text Area',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.QUILL_EDITOR]: {
        ICON:'article',
        LABEL: 'QUILL EDITOR',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.REPEATER]: {
        ICON:'reorder',
        LABEL: 'Repeater',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.LINK]: {
        ICON:'link',
        LABEL: 'Link',
        IS_ENABLE: true,
    },
    [CONSTANTS.CONTROL_TYPE.GAMI_INFINITE_SELECTION]: {
        ICON:'sports_esports',
        LABEL: 'Gami Infinite Selection',
        IS_ENABLE: true,
    },
}


