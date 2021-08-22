import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isCnpj, isCpf, isCpfOrCnpj } from '@douglas-serena/utils';

// @dynamic
export class DocsValidation {
  /**
   * @description EN: Validates "CPF" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CPF"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCpf: true }`
   * @returns Valid: `null`
   */
  public static isCpf(control: AbstractControl): ValidationErrors | null {
    return !control.value || isCpf(control.value) ? null : { isCpf: true };
  }

  /**
   * @description EN: Validates "CNPJ" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CNPJ"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCnpj: true }`
   * @returns Valid: `null`
   */
  public static isCnpj(control: AbstractControl): ValidationErrors | null {
    return !control.value || isCnpj(control.value) ? null : { isCnpj: true };
  }

  /**
   * @description EN: Validates the "CPF" and "CNPJ" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CPF" e "CNPJ"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCpfOrCnpj: true }`
   * @returns Valid: `null`
   */
  public static isCpfOrCnpj(control: AbstractControl): ValidationErrors | null {
    return !control.value || isCpfOrCnpj(control.value)
      ? null
      : { isCpfOrCnpj: true };
  }
}
