import {
  ChangeDetectorRef,
  ElementRef,
  Host,
  HostListener,
} from '@angular/core';
import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[contentReactive])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContenteditableControlAccessor,
      multi: true,
    },
  ],
})
export class ContenteditableControlAccessor implements ControlValueAccessor {
  element: HTMLElement;
  constructor(
    elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.element = elementRef.nativeElement;
    const exist = this.element.getAttribute('contenteditable');
    if (!exist) {
      this.element.setAttribute('contenteditable', 'true');
    }
  }

  @HostListener('change', ['$event.target.files'])
  onChange = (_: any) => {};
  @HostListener('blur')
  onTouched = () => {};
  @HostListener('DOMSubtreeModified', ['$event.target.textContent'])
  onInput(value: any) {
    this.writeValue(value);
    this.changeDetectorRef.detectChanges();
  }

  writeValue(_: any) {
    this.element.textContent = _;
    this.onChange(_);
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
