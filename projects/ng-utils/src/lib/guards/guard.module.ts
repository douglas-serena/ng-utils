import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ServicesModule } from '../services/services.module';
import { AuthGuard } from './auth.guard';
import { DialogGuard } from './dialog.guard';
import { LoggedGuard } from './logged.guard';
import { TitleGuard } from './title.guard';

@NgModule({
  imports: [CommonModule, ServicesModule, MatDialogModule],
  providers: [AuthGuard, TitleGuard, LoggedGuard, DialogGuard],
})
export class GuardModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: GuardModule,
      providers: [AuthGuard, TitleGuard, LoggedGuard, DialogGuard],
    };
  }
}
