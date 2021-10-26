import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService, MODAL_SCROLL_STRATEGY_PROVIDER } from './modal.service';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalContainer } from './modal.container';
import {
  ModalActions,
  ModalClose,
  ModalContent,
  ModalDrag,
  ModalHeader,
} from './modal.content';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, DragDropModule, OverlayModule, PortalModule],
  declarations: [
    ModalContainer,
    ModalActions,
    ModalContent,
    ModalHeader,
    ModalDrag,
    ModalClose,
  ],
  providers: [ModalService, MODAL_SCROLL_STRATEGY_PROVIDER],
  exports: [
    ModalContainer,
    ModalActions,
    ModalContent,
    ModalHeader,
    ModalDrag,
    ModalClose,
  ],
  entryComponents: [ModalContainer],
})
export class ModalModule {}
