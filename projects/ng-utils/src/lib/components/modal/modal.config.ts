import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export type AutoFocusTarget = 'dialog' | 'first-tabbable' | 'first-heading';

export interface ModalPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class ConfigModal<D = any> {
  viewContainerRef?: ViewContainerRef;
  id?: string;
  fullscreen?: boolean = false;
  focusTrap?: boolean = true;
  role?: 'dialog' | 'alertdialog' = 'dialog';
  disableClose?: boolean = false;
  width?: string;
  height?: string;
  ariaDescribedBy?: string | null = null;
  ariaLabelledBy?: string | null = null;
  ariaLabel?: string | null = null;
  autoFocus?: AutoFocusTarget | string | boolean = 'first-tabbable';
  restoreFocus?: boolean = true;
  position?: ModalPosition;
  componentFactoryResolver?: ComponentFactoryResolver;
  backdropClass?: string | string[] = '';
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string = '80vh';
  data?: D | null = null;
  direction?: Direction;
  scrollStrategy?: ScrollStrategy;
  closeOnNavigation?: boolean = true;
}
