import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notifications'
})
export class NotificationsPipe implements PipeTransform {

  transform(value: boolean): unknown {
    if (value) {
      return "ON"
    } else {
      return "OFF"
    }
  }

}
