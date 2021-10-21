import { ChangeDetectorRef, OnDestroy, SkipSelf } from '@angular/core';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ControlBase } from '../control.base';

@Component({ template: '' })
export class CheckboxControl
  extends ControlBase<HTMLInputElement>
  implements OnInit, OnDestroy
{
  @Input() public align: 'after' | 'before' = 'after';

  constructor(
    @Optional() protected controlContainer: ControlContainer,
    @SkipSelf() protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
