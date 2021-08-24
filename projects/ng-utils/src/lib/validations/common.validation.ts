import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  contains,
  isDifferent,
  isEqual,
  isPassword,
  isTypeof,
  Typeof,
} from '@douglas-serena/utils';
import { from, Observable, of, Subscription } from 'rxjs';
import { debounceTime, delay, map } from 'rxjs/operators';
import { DateValidation } from './date.validation';
import { DocsValidation } from './docs.validation';
import { FileValidation } from './file.validation';
import { NumberValidation } from './number.validation';
import { ObjectValidation } from './object.validation';
import { PatternValidation } from './pattern.validation';
import { StringValidation } from './string.validation';

// @dynamic
export class CommonValidation {
  public static date = DateValidation;
  public static number = NumberValidation;
  public static string = StringValidation;
  public static pattern = PatternValidation;
  public static docs = DocsValidation;
  public static files = FileValidation;
  public static object = ObjectValidation;

  /***
   * @description EN: validates if the value passed in the control value exists.
   * @description PT: valida se existe o valor passado no valor do controle.
   * @returns Invalid: `{ contains: true }`
   * @returns Valid: `null`
   */
  public static contains(pattern: string | RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || contains(control.value, pattern)
        ? null
        : { contains: true };
  }

  /***
   * @description EN: validate if the value passed is different from the control value.
   * @description PT: validar se o valor passado é diferente do valor do controle.
   * @returns Invalid: `{ isDifferent: true }`
   * @returns Valid: `null`
   */
  public static isDifferent(work: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      isDifferent(control.value, work) ? null : { isDifferent: true };
  }

  /***
   * @description EN: validate if the value passed is equal to the control value.
   * @description PT: validar se o valor passado é igual do valor do controle.
   * @returns Invalid: `{ isEqual: true }`
   * @returns Valid: `null`
   */
  public static isEqual(work: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      isEqual(control.value, work) ? null : { isEqual: true };
  }

  /**
   * @description EN: Validates if the control data type is the same as the one entered
   * @description PT: Valida se o tipo do dado do controle é igual o informado
   * @returns Invalid: `{ isTypeof: true }`
   * @returns Valid: `null`
   */
  public static isTypeof(type: Typeof): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isTypeof(control.value, type)
        ? null
        : { isTypeof: true };
  }

  /***
   * @description EN: Password validator, validates if the password has an uppercase or special character like '@,$,-,\' and if it has a number, all these validations can be disabled.
   * @description PT: Validador de senha, valida se a senha possui um carácter maiúsculo outro especial como '@,$,-,\' e se tem um numero, todas essa validações podem ser desabilitados.
   * @returns Invalid: `{ isPassword: true }`
   * @returns Valid: `null`
   */
  public static isPassword(
    disabled?: {
      charUpperCase?: boolean;
      charSpecial?: boolean;
      number?: boolean;
    },
    minLength: number = 9
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return isPassword(control.value, disabled, minLength)
        ? null
        : { isPassword: true };
    };
  }

  public static async(
    validator: (valueControl?: any) => Observable<any> | Promise<any>,
    _map: (result?: any, valueControl?: any) => ValidationErrors | null,
    time = 500
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let result = validator(control.value);
      if (result instanceof Promise) {
        result = of(from(result));
      }
      return result
        .pipe(delay(time))
        .pipe(debounceTime(time))
        .pipe(map((result) => _map(result, control.value)));
    };
  }

  /**
   * @description  EN: Used to link a secondary control with this one and can use validators like isEqual to validate that the two controls have the same value
   * @description  PT: Usado para vincular um controle secundário com este podendo usar validadores como o isEqual para validar se os dois controles possui o mesmo valor
   */
  public static control(
    controlKey: string,
    validation: (control: any) => ValidatorFn,
    listenerKey: string = ''
  ) {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (parent === null) {
        return null;
      }

      const sibling = parent.get(controlKey);
      if (sibling === null) {
        return null;
      }

      if (!listenerKey) {
        listenerKey = this.getControlKey(control, parent);
      }

      this._updateValidator(sibling, listenerKey, () => {
        control.updateValueAndValidity();
      });

      const fn = validation(sibling.value);

      return fn(control);
    };
  }

  // CONTROL EVENTS UPDATE FIELD

  private static _listeners: any = {};

  private static _eventDestroyListener: Subscription;

  /**
   * @description  EN: this Observable is used to remove the listeners, if this is not done there will be an increasing memory usage in each navigation
   * @description  PT: Este Observable é usado para remover os ouvintes, se isso não for feito haverá um uso crescente de memória em cada navegação
   */
  public static set eventDestroyListener(value: Observable<any>) {
    if (this._eventDestroyListener) {
      this._eventDestroyListener.unsubscribe();
    }
    this._eventDestroyListener = value.subscribe(() =>
      this._destroyListeners()
    );
  }

  public static getControlKey(
    control: AbstractControl,
    parent: FormGroup | FormArray
  ): any {
    return Object.keys(parent).find((key) => {
      let childControl = parent.get(key);
      return childControl === control;
    });
  }

  public static _updateValidator(
    control: AbstractControl,
    listenerName: string,
    callback: (value: any) => void
  ): void {
    if (
      !this._listeners[listenerName] ||
      this._listeners[listenerName].closed
    ) {
      this._listeners[listenerName] = control.valueChanges.subscribe(callback);
    }
  }

  public static _destroyListeners() {
    for (let keyListener in this._listeners) {
      this._listeners[keyListener].unsubscribe();
    }
    this._listeners = {};
  }
}
