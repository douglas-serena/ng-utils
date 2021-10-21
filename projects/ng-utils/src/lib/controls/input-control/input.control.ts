import {
  ChangeDetectorRef,
  HostListener,
  Input,
  SkipSelf,
} from '@angular/core';
import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  IServiceMask,
  masked,
  TConfigMask,
  TInputMode,
} from '@douglas-serena/utils';
import { fromEvent } from 'rxjs';
import { ControlBase } from '../control.base';

@Component({ template: '' })
export class InputControl
  extends ControlBase<HTMLInputElement>
  implements OnInit
{
  // NATIVE
  @Input() public label?: string;
  @Input() public autofocus?: boolean;
  @Input() public autocomplete = 'on';
  @Input() public autocapitalize = 'on';
  @Input() public placeholder: string = '';
  @Input() public maxlength?: number | string;
  @Input() public inputmode: TInputMode = 'text';
  @Input() public align: 'left' | 'right' | 'center' = 'left';

  // CUSTOM
  private maskRef?: IServiceMask;
  @Input() public loading?: boolean;
  @Input() public focusSelectAll = false;
  @Input() public unmask?: boolean = true;
  @Input() public maskConfig?: Partial<TConfigMask>;
  @Input() public mask?: string | Partial<TConfigMask>;

  constructor(
    @Optional() protected controlContainer: ControlContainer,
    @SkipSelf() protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.onInput();

    const element = this.elementRef!.nativeElement;

    this.__RECYCLE__.push(
      fromEvent(element, 'focus').subscribe(() => {
        if (this.focusSelectAll) {
          this.elementRef?.nativeElement.setSelectionRange(0, -1);
        }
      })
    );

    if (this.mask) {
      if (element) {
        this.maskRef = masked(this.mask, this.maskConfig as TConfigMask)
          .bind(element)
          .update(this.control.value, { dispatchEvent: false });
        this.changeDetectorRef.detectChanges();
      }
    }
  }

  @HostListener('input') public onInput() {
    const element = this.elementRef?.nativeElement;

    let value = element?.value?.toString();
    if (this.mask) {
      this.writeValue(value, false);
    }
  }

  public writeValue(value?: any, update = true): void {
    value = value?.toString();
    if (this.mask && this.unmask) {
      const myMask = masked(this.mask, this.maskConfig as TConfigMask);
      value = myMask.unmask(value);

      this.onChange(value);
      if (update) {
        super.writeValue(myMask.mask(value));
      }
    } else {
      this.onChange(value);
    }
    this.changeDetectorRef.detectChanges();
  }
}
