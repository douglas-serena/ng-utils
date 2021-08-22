import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isInstanceof, isObject } from '@douglas-serena/utils';

// @dynamic
export class ObjectValidation {
  /**
   * @description EN: Validates if it is a object
   * @description PT: Valida se é  uma object
   * @returns Invalid: `{ isObject: true }`
   * @returns Valid: `null`
   */
  public static isObject(control: AbstractControl): ValidationErrors | null {
    return !control.value || isObject(control.value)
      ? null
      : { isObject: true };
  }

  /**
   * @description EN: Validates if the control instance is the same as the one entered
   * @description PT: Valida se a instância do controle é igual a que foi informada
   * @returns Invalid: `{ isObject: true }`
   * @returns Valid: `null`
   */
  public static isInstanceof(instance: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isInstanceof(control.value, instance)
        ? null
        : { isInstanceof: true };
  }
}
