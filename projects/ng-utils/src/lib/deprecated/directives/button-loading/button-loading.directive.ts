import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  ViewContainerRef,
} from '@angular/core';
import { Directive, Input } from '@angular/core';
import { configuration } from './../../../configuration/public-api';

/** @deprecated */
@Directive({
  selector: '[btn-loading]',
})
export class ButtonLoadingDirective {
  containerRef?: ComponentRef<any>;
  element: HTMLButtonElement;
  content: any;

  @Input() spinnerColor: string = 'invert';
  @Input() set 'btn-loading'(value: boolean | string) {
    if (!!value) {
      this.initLoad();
    } else {
      this.stopLoad();
    }
  }

  constructor(
    elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.element = elementRef.nativeElement;
  }

  initLoad() {
    if (!configuration?.directives?.buttonLoading?.componentLoading) {
      throw new Error(
        '[LOADING] Adicione um componente de load nas configurações'
      );
    }

    this.element.classList.add('mat-loading');
    const content = this.element.querySelector<HTMLDivElement>(
      '.mat-button-wrapper'
    );
    if (content) {
      content.style.display = 'none';
    }

    this.viewContainerRef.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      configuration?.directives?.buttonLoading?.componentLoading
    );

    this.containerRef = this.viewContainerRef.createComponent(factory);
    this.containerRef.instance.diameter = 26;
    this.containerRef.instance.color = 'text' as any;
    const domElement = (this.containerRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.element.appendChild(domElement);
  }

  stopLoad() {
    if (this.containerRef?.instance) {
      this.containerRef.destroy();
      this.viewContainerRef.clear();

      const content = this.element.querySelector<HTMLDivElement>(
        '.mat-button-wrapper'
      );
      if (content) {
        content.style.display = 'flex';
      }
      this.containerRef = undefined;

      this.element.classList.remove('mat-loading');
    }
  }
}
