import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { ComponentRef, ViewChild } from '@angular/core';
import { EmbeddedViewRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
})
export class DialogContainerComponent
  extends BasePortalOutlet
  implements OnInit
{
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  constructor() {
    super();
  }

  ngOnInit() {}

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(portal);
  }
}
