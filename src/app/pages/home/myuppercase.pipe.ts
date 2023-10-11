import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myuppercase'
})
export class MyUppercasePipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
