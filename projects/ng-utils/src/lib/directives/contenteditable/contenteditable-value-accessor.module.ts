import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenteditableControlAccessor } from './contenteditable-value-accessor.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ContenteditableControlAccessor],
  exports: [ContenteditableControlAccessor],
})
export class ContenteditableControlAccessorModule {}
