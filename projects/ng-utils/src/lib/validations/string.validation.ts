import { AbstractControl, ValidationErrors } from '@angular/forms';

// @dynamic
export class StringValidation {
  /***
   * @description EN: Validates if it is a string
   * @description PT: Valida se é  uma string
   * @returns Invalid: `{ isString: true }`
   * @returns Valid: `null`
   */
  public static isString(control: AbstractControl): ValidationErrors | null {
    return !control.value || typeof control.value === 'string'
      ? null
      : { isString: true };
  }
}
