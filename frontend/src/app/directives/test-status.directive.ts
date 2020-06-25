import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTestStatus]'
})
export class TestStatusDirective {
  @Input('appTestStatus') set Succeed(condition: string) {
    switch (condition) {
      case ('SUCCES'):
        this.color = this.succeedColor;
        break;
      case ("FAILED"):
        this.color = this.failedColor;
        break;
      case('ERROR'):
        this.color = this.errorColor;
        break;
      default: 
        this.color = this.unknownColor;
    }
  }
  @Input() public succeedColor = '#2aa82a';
  @Input() public failedColor = '#f23a3a';
  @Input() public errorColor = '#ecc30c';
  @Input() public unknownColor = '#f5F5F5';
  @HostBinding('style.color') color = 'transparent';

  constructor() {}
}