import { FormControl } from '@angular/forms';

export function controlRequired(control: FormControl): boolean {
  let value = control.value,
    required = null;
  control.reset();
  required = control.hasError('required');
  control.setValue(value);
  return required;
}
