import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionDirective } from './interaction.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [InteractionDirective],
  exports: [InteractionDirective],
})
export class InteractionDirectiveModule {}
