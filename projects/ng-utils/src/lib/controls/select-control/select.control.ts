import { ChangeDetectorRef, SkipSelf } from '@angular/core';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { getNode } from '@douglas-serena/utils';
import { ControlBase } from '../control.base';

@Component({ template: '' })
export class SelectControl
  extends ControlBase<HTMLSelectElement>
  implements OnInit
{
  public options: any[] = [];
  @Input('options') set inputOptions(options: any[]) {
    this.createOptions(options);
  }

  @Input() keyIcon: string = 'icon';
  @Input() keyImage: string = 'image';
  @Input() keyLabel: string = 'label';
  @Input() keyValue: string = 'value';
  @Input() keyDisabled: string = 'disabled';

  constructor(
    @Optional() protected controlContainer: ControlContainer,
    @SkipSelf() protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, changeDetectorRef);
  }

  @Input() public compareWith: (one: any, two: any) => boolean = (one, two) =>
    JSON.stringify(one) === JSON.stringify(two);

  public createOptions(options: any[]) {
    this.options = options.map((option) => ({
      label: typeof option == 'string' ? option : this.getLabel(option),
      value: typeof option == 'string' ? option : this.getValue(option),
      disabled: this.getDisabled(option),
      icon: this.getIcon(option),
      image: this.getImage(option),
    }));
  }

  public getDisabled(option: any): boolean {
    return !!getNode(option, this.keyDisabled);
  }
  public getValue(option: any): any {
    const value = getNode(option, this.keyValue);
    return value ? value : option;
  }
  public getLabel(option: any): string {
    return getNode(option, this.keyLabel);
  }
  public getIcon(option: any): string {
    return getNode(option, this.keyIcon);
  }
  public getImage(option: any): string {
    return getNode(option, this.keyImage);
  }
}
