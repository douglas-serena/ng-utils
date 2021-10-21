import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingDirective } from './loading.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent, LoadingDirective],
  exports: [LoadingComponent],
})
export class LoadingModule {}
