import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifElse',
})
export class IfElsePipe implements PipeTransform {
  transform(value: any, returnOne: any, returnTwo: any): any {
    return !!value ? returnOne : returnTwo;
  }
}
