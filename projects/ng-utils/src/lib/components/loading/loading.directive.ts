import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { $extends } from '@douglas-serena/utils';
import { configuration } from '../../configuration/public-api';

@Directive({ selector: '[loading]' })
export class LoadingDirective {
  public _loading = false;
  public containerRef!: ComponentRef<any>;

  @Input() public ngType: null | string = null;
  @Input() public set loading(loading: boolean) {
    this._loading = loading;
    loading ? this.start() : this.stop();
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public start() {
    if (!configuration.components?.loading?.component) {
      throw new Error(
        '[LOADING] Adicione um componente de load nas configurações'
      );
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(
      configuration.components?.loading?.component
    );
    this.containerRef = this.viewContainerRef.createComponent(factory);

    let config: any = configuration.components?.loading?.config;

    if (this.ngType) {
      let configType = configuration.components?.loading?.type?.[this.ngType];
      config = $extends({}, config, configType);
    }

    if (config) {
      for (const key in config) {
        if (typeof config[key] === 'object') {
          $extends(this.containerRef.instance[key], config[key]);
        } else {
          this.containerRef.instance[key] = config[key];
        }
      }
    }
  }

  public stop() {
    this.containerRef?.destroy();
  }
}
