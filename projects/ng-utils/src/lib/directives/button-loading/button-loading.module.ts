import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoadingDirective } from './button-loading.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonLoadingDirective],
  exports: [ButtonLoadingDirective],
})
export class ButtonLoadingDirectiveModule {}
