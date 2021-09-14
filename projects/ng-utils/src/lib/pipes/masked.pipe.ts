import { Pipe, PipeTransform } from '@angular/core';
import { TConfigMask, masked } from '@douglas-serena/utils';

@Pipe({
  name: 'masked',
})
export class MaskedPipe implements PipeTransform {
  transform(
    value: any,
    mask: string | Partial<TConfigMask>,
    configMask?: Partial<TConfigMask>
  ): any {
    return masked(mask, configMask).mask(value);
  }
}
