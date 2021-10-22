import {
  AfterViewInit,
  OnChanges,
  SimpleChange,
  SkipSelf,
} from '@angular/core';
import { OnDestroy } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  ValidatorFn,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { $extends, Debounce, INPUT_TYPE } from '@douglas-serena/utils';
import { Subscription } from 'rxjs';
import { configuration } from '../configuration/public-api';
import { IControl } from './@types/interfaces/control.interface';
import { TError } from './@types/types/error.type';
import { controlRequired } from './utils/control-required';
import { UUID } from './utils/uuid';

@Component({ template: '' })
export class ControlBase<HTMLRef = HTMLElement>
  implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit
{
  // FORM CONTROL
  @ViewChild('elementRef') elementRef?: ElementRef<HTMLRef>;
  @Input() public formControl?: FormControl;
  @Input() public formControlName?: string;
  @Input() public isDisabled?: boolean;
  @Input() public set disabled(disabled: boolean) {
    this.isDisabled = disabled;
    this.isDisabled ? this.control.disable() : this.control.enable();
  }
  @Input() public set validators(validators: ValidatorFn | ValidatorFn[]) {
    if (validators) {
      this.control.setValidators(validators);
      this.control.updateValueAndValidity();
    }
  }
  public get control(): FormControl {
    if (this.controlContainer && this.formControlName) {
      return this.controlContainer.control?.get(
        this.formControlName
      ) as FormControl;
    }
    if (!this.formControl) {
      this.formControl = new FormControl('');
    }
    return this.formControl;
  }

  // TWO-WAY BINDING
  @Output() public valueChange = new EventEmitter<any>();
  @Input() public set value(value: any) {
    this.onChange(value);
    this.writeValue(value);
    this.changeDetectorRef.detectChanges();
  }

  // COMMON
  @Input() public type?: string;
  @Input() public config?: IControl;
  @Input() public required?: boolean;
  @Input() public readOnly?: boolean;
  @Input() public id: string = UUID();

  @Input() public errors?: TError;

  protected __RECYCLE__: Subscription[] = [];

  constructor(
    @Optional() protected controlContainer: ControlContainer,
    @SkipSelf() protected changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    if (this.required === undefined) {
      this.required = controlRequired(this.control);
    }

    if (this.type) {
      this.config = configuration.controls?.control?.[this.type];
    }

    if (!this.type) {
      this.type = this.config?.type || 'text';
    }

    if (!INPUT_TYPE.includes(this.type)) {
      this.type = 'text';
    }

    if (this.config) {
      for (let key in this.config) {
        if (typeof this.config[key] === 'object') {
          this[key as 'id'] = $extends({}, this.config[key], this[key as 'id']);
        } else {
          this[key as 'id'] = this.config[key];
        }
      }
    }
  }

  public ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy() {
    for (const subscription of this.__RECYCLE__) {
      subscription.unsubscribe();
    }
  }

  public onTouched = () => this.control.markAsTouched();
  public onChange = (_: any) => {
    this.valueChange.emit(_);
  };

  public writeValue(value: any): void {
    this.control.setValue(value);
  }
  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  public registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
