import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthGuard } from './auth.guard';
import { LoggedGuard } from './logged.guard';
import { TitleGuard } from './title.guard';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  providers: [AuthGuard, TitleGuard, LoggedGuard],
})
export class GuardModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: GuardModule,
      providers: [AuthGuard, TitleGuard, LoggedGuard],
    };
  }
}
