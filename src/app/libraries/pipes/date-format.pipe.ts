import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: false
})
export class DateFormatPipe implements PipeTransform {

  private datePipe = new DatePipe('en-US');

  transform(value: any, format: string = 'MM/dd/YYYY HH:mm'): any {
    if (!value) return '';
    return this.datePipe.transform(value, format);
  }
}
