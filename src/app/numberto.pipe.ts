import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberto'
})
export class NumbertoPipe implements PipeTransform {

  transform(value: any): number {
    return parseFloat(value);
  }

}
