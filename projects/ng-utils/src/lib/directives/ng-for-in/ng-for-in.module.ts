import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForIn } from './ng-for-in.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgForIn],
  exports: [NgForIn],
})
export class NgForInModule {}
