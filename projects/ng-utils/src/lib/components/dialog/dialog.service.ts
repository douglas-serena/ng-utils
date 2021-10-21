import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  Directive,
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  Optional,
  StaticProvider,
  TemplateRef,
  Type,
} from '@angular/core';
import { of } from 'rxjs';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { ConfigDialog } from './dialog.config';
import { DialogRef } from './dialog.ref';

export const DIALOG_DATA = new InjectionToken<any>('DialogData');
export const DIALOG_DEFAULT_CONFIG = new InjectionToken<ConfigDialog>(
  'DialogDefaultConfig'
);

@Directive()
export class DialogBase<C extends DialogContainerComponent> {
  constructor(
    private overlay: Overlay,
    private defaultConfig: ConfigDialog,
    private dialogContainerType: Type<C>,
    private dialogRefConstructor: Type<DialogRef<any>>,
    private injector: Injector,
    private dialogDataToken: InjectionToken<any>
  ) {}

  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T>,
    config?: ConfigDialog
  ) {
    config = applyConfigDefaults(config, this.defaultConfig);

    const overlayRef = this.createOverlay(config);
    const dialogContainer = this.attachDialogContainer(overlayRef, config);
    const dialogRef = this.attachDialogContent<T, R>(
      componentOrTemplateRef,
      dialogContainer,
      overlayRef,
      config
    );

    return dialogRef;
  }

  close() {}

  private attachDialogContent<T, R>(
    componentOrTemplateRef: ComponentType<T>,
    dialogContainer: C,
    overlayRef: OverlayRef,
    config: ConfigDialog
  ): any {
    const dialogRef = new this.dialogRefConstructor(
      overlayRef,
      dialogContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
          $implicit: config.data,
          dialogRef,
        })
      );
    } else {
      const injector = this.createInjector<T>(
        config,
        dialogRef,
        dialogContainer
      );

      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );
      dialogRef.componentInstance = contentRef.instance;
    }
  }

  private attachDialogContainer(overlay: OverlayRef, config: ConfigDialog): C {
    const injector = Injector.create({
      parent: this.injector,
      providers: [{ provide: ConfigDialog, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      this.dialogContainerType,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );
    const containerRef = overlay.attach(containerPortal);

    return containerRef.instance;
  }

  private createOverlay(configDialog: ConfigDialog) {
    const overlayConfig = this.getOverlayConfig(configDialog);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(configDialog: ConfigDialog) {
    const state = new OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: configDialog.scrollStrategy,
      panelClass: configDialog.panelClass,
      hasBackdrop: configDialog.hasBackdrop,
      direction: configDialog.direction,
      minWidth: configDialog.minWidth,
      minHeight: configDialog.minHeight,
      maxWidth: configDialog.maxWidth,
      maxHeight: configDialog.maxHeight,
      disposeOnNavigation: configDialog.closeOnNavigation,
    });

    if (configDialog.backdropClass) {
      state.backdropClass = configDialog.backdropClass;
    }

    return state;
  }

  private createInjector<T>(
    config: ConfigDialog,
    dialogRef: DialogRef<T>,
    dialogContainer: C
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    const providers: StaticProvider[] = [
      { provide: this.dialogContainerType, useValue: dialogContainer },
      { provide: this.dialogDataToken, useValue: config.data },
      { provide: this.dialogRefConstructor, useValue: dialogRef },
    ];

    if (
      config.direction &&
      (!userInjector ||
        !userInjector.get<Directionality | null>(
          Directionality,
          null,
          InjectFlags.Optional
        ))
    ) {
      providers.push({
        provide: Directionality,
        useValue: { value: config.direction, change: of() },
      });
    }

    return Injector.create({
      parent: userInjector || this.injector,
      providers,
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class DialogService extends DialogBase<DialogContainerComponent> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional()
    @Inject(DIALOG_DEFAULT_CONFIG)
    defaultConfig: ConfigDialog
  ) {
    super(
      overlay,
      defaultConfig,
      DialogContainerComponent,
      DialogRef,
      injector,
      DIALOG_DATA
    );
  }
}

function applyConfigDefaults(
  config?: ConfigDialog,
  defaultOptions?: ConfigDialog
): ConfigDialog {
  return Object.assign({}, config, defaultOptions);
}
