import { Params } from '@angular/router';
import { calc, isNumeric } from '@douglas-serena/utils';

function convert(type: string): any {
  const value = type.toLowerCase();
  if (isNumeric(value)) {
    return calc.parse(value);
  }
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }
  return type;
}

export function convertTypes(
  types: string | string[] | Params | { [key: string]: any }
) {
  if (typeof types === 'string') {
    return convert(types);
  }
  if (Array.isArray(types)) {
    return types.map((type) => convert(type));
  }

  for (const key in types) {
    types[key] = convert(types[key]);
  }
  return types;
}
