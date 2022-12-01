import { FormArray, FormControl, FormGroup } from "@angular/forms";

export function handleParams(value: string, params: any): string {
    const replacedValue = value.replace(/{{\s?([^{}\s]*)\s?}}/g, (substring: string, parsedKey: string) => {
        const replacer = params[parsedKey];
        return replacer !== undefined ? replacer : substring;
    });
    return replacedValue;
}

export function uuid() {
    var chars = '0123456789abcdef'.split('');

    var uuid = [],
      rnd = Math.random,
      r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // version 4

    for (var i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (rnd() * 16);

        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r & 0xf];
      }
    }
    
    return uuid.join('');
}

export function validateAllFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        for (const control1 of control.controls) {
          if (control1 instanceof FormControl) {
            control1.markAsDirty({ onlySelf: true });
            control1.markAsTouched({ onlySelf: true });
          }
          if (control1 instanceof FormGroup) {
            validateAllFields(control1);
          }
        }
      }
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        validateAllFields(control);
      }
    });
}