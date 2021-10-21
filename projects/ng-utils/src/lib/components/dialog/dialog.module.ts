import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from './dialog.service';
import { PortalModule } from '@angular/cdk/portal';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';

@NgModule({
  imports: [CommonModule, PortalModule, OverlayModule],
  declarations: [DialogContainerComponent],
  providers: [DialogService],
})
export class DialogModule {}
