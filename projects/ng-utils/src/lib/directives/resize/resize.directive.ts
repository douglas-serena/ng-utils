import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { IConfigResize, Resize, resize } from '@douglas-serena/utils';

@Directive({ selector: '[resize]' })
export class ResizeDirective implements OnInit, OnDestroy {
  @Input() public resize: IConfigResize['resize'] = [];
  @Input() public resizeConfig: Partial<Omit<IConfigResize, 'resize'>> = {};
  private _resize!: Resize;

  private element: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this._resize = resize(this.element, {
      ...this.resizeConfig,
      resize: this.resize,
    });
  }

  ngOnDestroy() {
    this._resize.destroy();
  }
}
