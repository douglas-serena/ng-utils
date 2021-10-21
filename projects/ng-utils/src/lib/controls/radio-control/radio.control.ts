import { ChangeDetectorRef, Input, SkipSelf } from '@angular/core';
import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ControlBase } from '../control.base';

@Component({ template: '' })
export class RadioControl
  extends ControlBase<HTMLInputElement>
  implements OnInit
{
  @Input() radios: any[] = [];

  constructor(
    @Optional() protected controlContainer: ControlContainer,
    @SkipSelf() protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
