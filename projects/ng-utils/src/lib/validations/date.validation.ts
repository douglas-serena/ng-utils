import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TMaxMin, TRange } from '@douglas-serena/utils';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type TDateAny = Date | string | dayjs.Dayjs | number;

// @dynamic
export class DateValidation {
  /***
   * @description EN: Validate if it is a valid date.
   * @description PT: Valida se é uma data valida.
   * @returns Invalid: `{ isDate: true }`
   * @returns Valid: `null`
   */
  public static isDate(control: AbstractControl): ValidationErrors | null {
    return !control.value || dayjs(control.value).isValid()
      ? null
      : { isDate: true };
  }

  /***
   * @description EN: Validates if the date entered is after the control date.
   * @description PT: Valida se a data informada é depois da data do controle.
   * @returns Invalid: `{ isAfter: true }`
   * @returns Valid: `null`
   */
  public static isAfter(date: TDateAny, unit?: dayjs.OpUnitType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isAfter(dayjs(control.value), unit)
        ? null
        : { isAfter: true };
  }

  /***
   * @description EN: Validates if the date entered is before the control date.
   * @description PT: Valida se a data informada é antes da data do controle.
   * @returns Invalid: `{ isBefore: true }`
   * @returns Valid: `null`
   */
  public static isBefore(date: TDateAny, unit?: dayjs.OpUnitType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isBefore(dayjs(control.value), unit)
        ? null
        : { isBefore: true };
  }

  /***
   * @description EN: Validates if the date entered is the same as the control date.
   * @description PT: Valida se a data informada é igual a data do controle.
   * @returns Invalid: `{ isEqual: true }`
   * @returns Valid: `null`
   */
  public static isEqual(date: TDateAny, unit?: dayjs.OpUnitType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isSame(dayjs(control.value), unit)
        ? null
        : { isEqual: true };
  }

  /***
   * @description EN: Validates if the control date is within the informed range.
   * @description PT: Valida se a data do controle esta dentro do range informado.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isBetween(
    range: TRange,
    unit?: dayjs.OpUnitType,
    d?: '()' | '[]' | '[)' | '(]'
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value ||
      dayjs(control.value).isBetween(
        dayjs(range?.start || new Date()),
        dayjs(range?.end || new Date()),
        unit,
        d
      )
        ? null
        : { isBetween: true };
  }

  /***
   * @description EN: Valida se a data informada é deferente a data do control.
   * @description PT: Validates if the date entered is different from the controle date.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isDifferent(
    date: TDateAny,
    unit?: dayjs.OpUnitType
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || !dayjs(date).isSame(dayjs(control.value), unit)
        ? null
        : { isDifferent: true };
  }

  /***
   * @description EN: Validates if the control's birth date is within the range of informed ages.
   * @description PT: Valida se a data de nascimento do controle esta dentro do range das idades informadas.
   * @returns Invalid: `{ isBirchDay: true }`
   * @returns Valid: `null`
   */
  public static isBirchDay(year: TMaxMin): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isBirthDateValid = (birchDay: TDateAny): boolean => {
        if (!year?.max) {
          year.min = Number.parseInt(year?.min?.toString() as string);
          return dayjs(birchDay).isSameOrBefore(
            dayjs().subtract(year.min, 'years')
          );
        }
        year.max = Number.parseInt(year?.max?.toString() as string);
        year.min = Number.parseInt(year?.min?.toString() as string);

        return (
          dayjs(birchDay).isSameOrAfter(dayjs().subtract(year.max, 'years')) &&
          dayjs(birchDay).isSameOrBefore(
            dayjs().subtract(year.min || 0, 'years')
          )
        );
      };

      return !control.value || isBirthDateValid(control.value)
        ? null
        : { isBirchDay: true };
    };
  }
}
