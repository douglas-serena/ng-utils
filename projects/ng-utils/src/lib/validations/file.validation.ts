import {
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  getSizeImage,
  isAllowExtensions,
  maxSize,
  minSize,
  RESOLUTION_WIDTH,
  TBitSizesKeys,
} from '@douglas-serena/utils';

// @dynamic
export class FileValidation {
  /***
   * @description EN: Validates if any file was passed
   * @description PT: Válida se foi passado algum arquivo
   * @returns Invalid: `{ isRequiredFile: true }`
   * @returns Valid: `null`
   */
  public static isRequiredFile(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value && control.value.length
      ? null
      : { isRequiredFile: true };
  }

  /***
   * @description EN: Validates if any file was passed
   * @description PT: Válida se foi passado algum arquivo
   * @returns {IReturnExtension}
   * @returns Valid: `null`
   */
  public static isAllowExtensions(extensions: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = isAllowExtensions(control.value, extensions);
      return files.valid ? files : null;
    };
  }

  /***
   * @description EN: Check if the file size is within the stated limit
   * @description PT: Verifica se o tamanho do arquivo está no limite informado
   * @returns {IReturnMinSize}
   * @returns Valid: `null`
   */
  public static minSize(min: number, type: TBitSizesKeys = 'KB'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = minSize(control.value, min, type);
      return files.valid ? files : null;
    };
  }

  /***
   * @description EN: Check if the file size is within the stated limit
   * @description PT: Verifica se o tamanho do arquivo está no limite informado
   * @returns Invalid: `{ maxSize: {maxSize: number, typeDefined: string, filesInvalid: { filename: string; type: string; fileSizeInBytes: string | number; }[] }`
   * @returns Invalid: `{ isNotFile: true }`
   * @returns Valid: `null`
   */
  public static maxSize(max: number, type: TBitSizesKeys = 'KB'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = maxSize(control.value, max, type);
      return files.valid ? files : null;
    };
  }

  /***
   * @description EN: Check the amount of files accepted
   * @description PT: Verifica a quantidade de arquivos aceitos
   * @returns Invalid: `{ maxFiles: true }`
   * @returns Valid: `null`
   */
  public static maxFiles(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.value instanceof FileList)) {
        return null;
      }
      const files = control.value || [];
      return files.length > max ? { maxFiles: true } : null;
    };
  }

  /***
   * @description EN: Check the amount of files accepted
   * @description PT: Verifica a quantidade de arquivos aceitos
   * @returns Invalid: `{ minFiles: true }`
   * @returns Valid: `null`
   */
  public static minFiles(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.value instanceof FileList)) {
        return null;
      }
      const files = control.value || [];
      return files.length < min ? { minFiles: true } : null;
    };
  }

  /***
   * @description EN: Check the accepted width of the image
   * @description PT: Verificar a largura aceita da imagem
   * @returns Invalid: `{ min_width_image: { filename: "", min_width_allow: 0, width_file: 0 } }`
   * @returns Invalid: `{ min_width_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  min_width_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMinWidthImage(
    min: number = RESOLUTION_WIDTH.HD
  ): AsyncValidatorFn | any {
    return async (control: AbstractControl) => {
      const { width } = await getSizeImage(control.value);

      return width >= min ? null : { minHeightFile: true };
    };
  }

  /***
   * @description EN: Check the accepted width of the image
   * @description PT: Verificar a largura aceita da imagem
   * @returns Invalid: `{ max_width_image: { filename: "", max_width_allow: 0, width_file: 0 } }`
   * @returns Invalid: `{ max_width_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  max_width_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMaxWidthImage(
    max: number = RESOLUTION_WIDTH.HD
  ): AsyncValidatorFn | any {
    return async (control: AbstractControl) => {
      const { width } = await getSizeImage(control.value);

      return width <= max ? null : { maxWidthFile: true };
    };
  }

  /***
   * @description EN: Check the accepted height of the image
   * @description PT: Verificar a altura aceita da imagem
   * @returns Invalid: `{ min_height_image: { filename: "", min_height_allow: 0, height_file: 0 } }`
   * @returns Invalid: `{ min_height_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  min_height_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMinHeightImage(
    min: number = RESOLUTION_WIDTH.HD
  ): AsyncValidatorFn | any {
    return async (control: AbstractControl) => {
      const { height } = await getSizeImage(control.value);

      return height >= min ? null : { minHeightFile: true };
    };
  }

  /***
   * @description EN: Check the accepted height of the image
   * @description PT: Verificar a altura aceita da imagem
   * @returns Invalid: `{ max_height_image: { filename: "", max_height_allow: 0, height_file: 0 } }`
   * @returns Invalid: `{ max_height_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  max_height_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMaxHeightImage(
    max: number = RESOLUTION_WIDTH.HD
  ): AsyncValidatorFn | any {
    return async (control: AbstractControl) => {
      const { width } = await getSizeImage(control.value);

      return width <= max ? null : { maxHeightFile: true };
    };
  }
}
