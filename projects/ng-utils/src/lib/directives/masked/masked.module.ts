import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskedDirective } from './masked.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskedDirective],
  exports: [MaskedDirective],
})
export class MaskedDirectiveModule {}
