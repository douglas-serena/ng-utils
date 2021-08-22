import { Pipe, PipeTransform } from '@angular/core';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { isInstanceof } from '@douglas-serena/utils';
dayjs.extend(customParseFormat);

@Pipe({
  name: 'parserDate',
})
export class ParserDatePipe implements PipeTransform {
  transform(value: any, format = 'YYYY-MM-DDTHH:mm:ssZ'): any {
    if (isInstanceof(value, Date)) {
      return value;
    }
    return dayjs(value, format).toDate();
  }
}
