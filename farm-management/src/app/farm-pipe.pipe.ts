import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farmPipe',
})
export class FarmPipePipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}
