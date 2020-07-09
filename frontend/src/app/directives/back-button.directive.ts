import { Directive, HostListener, HostBinding, Input } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appBackButton]'
})
export class BackButtonDirective {

  protected classes: string[] = [];

  constructor(private location: Location) {
    this.classes.push('backbutton');
    this.classes.push('mat-raised-button');
  }

  @HostBinding('class')
  get elementClass(): string {
    return this.classes.join(' ');
  }
  set(val: string) {
    this.classes = val.split(' ');
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
