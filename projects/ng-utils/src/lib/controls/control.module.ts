import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlBase } from './control.base';
import { SelectControl } from './select-control/select.control';
import { RadioControl } from './radio-control/radio.control';
import { CheckboxControl } from './checkbox-control/checkbox.control';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputControl } from './input-control/input.control';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ControlBase,
    SelectControl,
    RadioControl,
    CheckboxControl,
    InputControl,
  ],
  exports: [
    ControlBase,
    SelectControl,
    RadioControl,
    CheckboxControl,
    InputControl,
  ],
})
export class ControlModule {}
