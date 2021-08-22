import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  isBeforeNumber,
  isLess,
  isLessOrEqual,
  isMore,
  isMoreOrEqual,
  isNumber,
  NumberRange,
} from '@douglas-serena/utils';

// @dynamic
export class NumberValidation {
  /**
   * @description EN: validate if it is a number
   * @description PT: valida  se é um numero.
   * @returns Invalid: `{ isNumber: true }`
   * @returns Valid: `null`
   */
  public static isNumber(control: AbstractControl): ValidationErrors | null {
    return !control.value || isNumber(control.value)
      ? null
      : { isNumber: true };
  }

  /**
   * @description EN: Validates if the value is less than the past value.
   * @description PT: Valida se o valor é menor do que o valor passado.
   * @returns Invalid: `{ isLess: true }`
   * @returns Valid: `null`
   */
  public static isLess(number: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isLess(control.value, number) ? null : { isLess: true };
  }

  /**
   * @description EN: Validates if the value is less than or equal to the value passed.
   * @description PT: Valida se o valor é menor ou igual do que o valor passado.
   * @returns Invalid: `{ isLessOrEqual: true }`
   * @returns Valid: `null`
   */
  public static isLessOrEqual(number: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isLessOrEqual(control.value, number)
        ? null
        : { isLessOrEqual: true };
  }

  /**
   * @description EN: Validates if the value is greater than the value passed.
   * @description PT: Valida se o valor é maior do que o valor passado.
   * @returns Invalid: `{ isMore: true }`
   * @returns Valid: `null`
   */
  public static isMore(number: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isMore(control.value, number) ? null : { isMore: true };
  }

  /**
   * @description EN: Validates if the value is greater than or equal to the value passed.
   * @description PT: Valida se o valor é maior ou igual do que o valor passado.
   * @returns Invalid: `{ isMoreOrEqual: true }`
   * @returns Valid: `null`
   */
  public static isMoreOrEqual(number: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isMoreOrEqual(control.value, number)
        ? null
        : { isMoreOrEqual: true };
  }

  /**
   * @description EN: validate if it is between an initial and a final value, being it equal to the initial or final value or between them.
   * @description PT: validar se esta entre um valor inicial e um final, sendo ele igual o valor inicial ou final ou entre eles.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isBetween(range: NumberRange): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isBeforeNumber(control.value, range)
        ? null
        : { isBetween: true };
  }
}
