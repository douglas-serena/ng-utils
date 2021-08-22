import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  DateAny,
  DateRange,
  isAfterDate,
  isBetweenDate,
  isBirthDateValid,
  isDateValid,
  isDifferentDate,
  isEqualDate,
  MaxMin,
} from '@douglas-serena/utils';
export class DateValidation {
  /***
   * @description EN: Validate if it is a valid date.
   * @description PT: Valida se é uma data valida.
   * @returns Invalid: `{ isDate: true }`
   * @returns Valid: `null`
   */
  public static isDate(control: AbstractControl): ValidationErrors | null {
    return !control.value || isDateValid(control.value)
      ? null
      : { isDate: true };
  }

  /***
   * @description EN: Validates if the date entered is after the control date.
   * @description PT: Valida se a data informada é depois da data do controle.
   * @returns Invalid: `{ isAfter: true }`
   * @returns Valid: `null`
   */
  public static isAfter(date: DateAny): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isAfterDate(date, control.value)
        ? null
        : { isAfter: true };
  }

  /***
   * @description EN: Validates if the date entered is before the control date.
   * @description PT: Valida se a data informada é antes da data do controle.
   * @returns Invalid: `{ isBefore: true }`
   * @returns Valid: `null`
   */
  public static isBefore(date: DateAny): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isAfterDate(date, control.value)
        ? null
        : { isBefore: true };
  }

  /***
   * @description EN: Validates if the date entered is the same as the control date.
   * @description PT: Valida se a data informada é igual a data do controle.
   * @returns Invalid: `{ isEqual: true }`
   * @returns Valid: `null`
   */
  public static isEqual(date: DateAny): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isEqualDate(date, control.value)
        ? null
        : { isEqual: true };
  }

  /***
   * @description EN: Validates if the control date is within the informed range.
   * @description PT: Valida se a data do controle esta dentro do range informado.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isBetween(range: DateRange): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isBetweenDate(control.value, range)
        ? null
        : { isBetween: true };
  }

  /***
   * @description EN: Valida se a data informada é deferente a data do control.
   * @description PT: Validates if the date entered is different from the controle date.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isDifferent(date: DateAny): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isDifferentDate(date, control.value)
        ? null
        : { isDifferent: true };
  }

  /***
   * @description EN: Validates if the control's birth date is within the range of informed ages.
   * @description PT: Valida se a data de nascimento do controle esta dentro do range das idades informadas.
   * @returns Invalid: `{ isBirchDay: true }`
   * @returns Valid: `null`
   */
  public static isBirchDay(year: MaxMin): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isBirthDateValid(control.value, year)
        ? null
        : { isBirchDay: true };
  }
}
