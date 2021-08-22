import { Pipe, PipeTransform } from '@angular/core';
import { ConfigMask, masked } from '@douglas-serena/utils';

@Pipe({
  name: 'masked',
})
export class MaskedPipe implements PipeTransform {
  transform(
    value: any,
    mask: string | Partial<ConfigMask>,
    configMask?: Partial<ConfigMask>
  ): any {
    return masked(mask, configMask).mask(value);
  }
}
