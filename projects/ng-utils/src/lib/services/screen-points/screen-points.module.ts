import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenPointsService } from './screen-points.service';

@NgModule({
  imports: [CommonModule],
  providers: [ScreenPointsService],
})
export class ScreenPointsModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ScreenPointsService,
      providers: [ScreenPointsService],
    };
  }
}
