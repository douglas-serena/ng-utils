import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isString } from '@douglas-serena/utils';

// @dynamic
export class StringValidation {
  /***
   * @description EN: Validates if it is a string
   * @description PT: Valida se é  uma string
   * @returns Invalid: `{ isString: true }`
   * @returns Valid: `null`
   */
  public static isString(control: AbstractControl): ValidationErrors | null {
    return !control.value || isString(control.value)
      ? null
      : { isString: true };
  }
}
