import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export function createProviderControl(control: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => control),
    multi: true,
  };
}
