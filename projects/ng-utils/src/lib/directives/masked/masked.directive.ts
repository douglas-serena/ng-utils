import { ChangeDetectorRef, ElementRef, HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IServiceMask, masked, TConfigMask } from '@douglas-serena/utils';

@Directive({
  selector: '[masked]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskedDirective,
      multi: true,
    },
  ],
})
export class MaskedDirective implements ControlValueAccessor {
  element!: HTMLElement;

  @Input() public set masked(mask: any) {
    if (mask) {
      let value =
        this.element instanceof HTMLInputElement
          ? (this.element.value as string)
          : (this.element.textContent as string);

      this.mask = mask;
      this.maskRef = masked(mask, this.maskConfig as TConfigMask)
        .bind(this.element)
        .update(value, { dispatchEvent: false });
    }
  }

  public maskRef?: IServiceMask;
  @Input() public unmask?: boolean = true;
  @Input() public onFocusSelectAll = false;
  @Input() public maskConfig?: Partial<TConfigMask>;
  @Input() public mask?: string | Partial<TConfigMask>;

  constructor(
    elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.element = elementRef.nativeElement;
  }

  @HostListener('input') public onInput() {
    let value =
      this.element instanceof HTMLInputElement
        ? (this.element.value as string)
        : (this.element.textContent as string);

    value = value.toString();
    if (this.mask) {
      this.writeValue(value, false);
    }
  }

  // @HostListener('focus') public onFocus(event: Event) {
  //   if (event && this.onFocusSelectAll) {
  //     this.element?.setSelectionRange(0, -1);
  //   }
  // }

  onChange = (_: any) => {};
  @HostListener('blur')
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public writeValue(value: any, update = true): void {
    value = value.toString();
    if (this.mask && this.unmask) {
      const myMask = masked(this.mask, this.maskConfig as TConfigMask);
      value = myMask.unmask(value);

      this.onChange(value);
      if (update) {
        this.maskRef?.update(myMask.mask(value));
      }
    } else {
      this.onChange(value);
    }
    this.changeDetectorRef.detectChanges();
  }
}
