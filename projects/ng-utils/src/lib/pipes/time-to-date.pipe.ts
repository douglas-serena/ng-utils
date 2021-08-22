import { Pipe, PipeTransform } from '@angular/core';
import { timeToDate } from '@douglas-serena/utils';

@Pipe({
  name: 'timeToDate',
})
export class TimeToDatePipe implements PipeTransform {
  transform(value: any): any {
    return timeToDate(value);
  }
}
