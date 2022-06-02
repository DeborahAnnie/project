import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farmPipe',
})
export class FarmPipePipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }

  // transform(value: any[], filterString: string, propName: string): any[] {
  //     const result: any = [];
  //     if (!value || filterString === '' || propName === '') {
  //      return value;
  //     }
  //     value.forEach((a: any) => {
  //      if (a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
  //       result.push(a);
  //      }
  //     });
  //     return result;
  //    }

  //   }
}
