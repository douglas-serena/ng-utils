import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export interface DialogPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class ConfigDialog<D = any> {
  viewContainerRef?: ViewContainerRef;
  id?: string;
  //  role?: DialogRole = 'dialog';
  //  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  //  ariaDescribedBy?: string | null = null;
  //  ariaLabelledBy?: string | null = null;
  //  ariaLabel?: string | null = null;
  //  autoFocus?: AutoFocusTarget | string | boolean = 'first-tabbable';
  //  restoreFocus?: boolean = true;
  position?: DialogPosition;
  componentFactoryResolver?: ComponentFactoryResolver;
  backdropClass?: string | string[] = '';
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string;
  data?: D | null = null;
  direction?: Direction;
  scrollStrategy?: ScrollStrategy;
  closeOnNavigation?: boolean = true;
}
