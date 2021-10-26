import { Directionality } from '@angular/cdk/bidi';
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  StaticProvider,
  TemplateRef,
  Type,
} from '@angular/core';
import { defer, Observable, of, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ConfigModal } from './modal.config';
import { ModalContainer, ModalContainerBase } from './modal.container';
import { ModalRef } from './modal.ref';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');
export const MODAL_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'MODAL_SCROLL_STRATEGY'
);
export const MODAL_DEFAULT_OPTIONS = new InjectionToken<ConfigModal>(
  'MODAL_DEFAULT_OPTIONS'
);

export function MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

export const MODAL_SCROLL_STRATEGY_PROVIDER = {
  provide: MODAL_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MODAL_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Directive()
export abstract class ModalBase<C extends ModalContainerBase>
  implements OnDestroy
{
  private _openModalsAtThisLevel: ModalRef<any>[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<ModalRef<any>>();
  private _ariaHiddenElements = new Map<Element, string | null>();
  private _scrollStrategy: () => ScrollStrategy;

  get openModals(): ModalRef<any>[] {
    return this._parentModal
      ? this._parentModal.openModals
      : this._openModalsAtThisLevel;
  }

  get afterOpened(): Subject<ModalRef<any>> {
    return this._parentModal
      ? this._parentModal.afterOpened
      : this._afterOpenedAtThisLevel;
  }

  _getAfterAllClosed(): Subject<void> {
    const parent = this._parentModal;
    return parent
      ? parent._getAfterAllClosed()
      : this._afterAllClosedAtThisLevel;
  }

  readonly afterAllClosed: Observable<void> = defer(() =>
    this.openModals.length
      ? this._getAfterAllClosed()
      : this._getAfterAllClosed().pipe(startWith(undefined))
  ) as Observable<any>;

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    private _defaultOptions: ConfigModal | undefined,
    private _parentModal: ModalBase<C> | undefined,
    private _overlayContainer: OverlayContainer,
    scrollStrategy: any,
    private _modalRefConstructor: Type<ModalRef<any>>,
    private _modalContainerType: Type<C>,
    private _modalDataToken: InjectionToken<any>
  ) {
    this._scrollStrategy = scrollStrategy;
  }

  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: ConfigModal<D>
  ): ModalRef<T, R>;
  open<T, D = any, R = any>(
    template: TemplateRef<T>,
    config?: ConfigModal<D>
  ): ModalRef<T, R>;
  open<T, D = any, R = any>(
    template: ComponentType<T> | TemplateRef<T>,
    config?: ConfigModal<D>
  ): ModalRef<T, R>;
  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: ConfigModal<D>
  ): ModalRef<T, R> {
    config = _applyConfigDefaults(
      config,
      this._defaultOptions || new ConfigModal()
    );

    if (config.id && this.getModalById(config.id)) {
      throw Error(
        `Modal with id "${config.id}" exists already. The Modal id must be unique.`
      );
    }

    const overlayRef = this._createOverlay(config);
    const modalContainer = this._attachModalContainer(overlayRef, config);
    const modalRef = this._attachModalContent<T, R>(
      componentOrTemplateRef,
      modalContainer,
      overlayRef,
      config
    );

    if (!this.openModals.length) {
      this._hideNonDialogContentFromAssistiveTechnology();
    }

    this.openModals.push(modalRef);
    modalRef.afterClosed().subscribe(() => this._removeOpenDialog(modalRef));
    this.afterOpened.next(modalRef);

    modalContainer.initializeWithAttachedContent();

    return modalRef;
  }

  getModalById(id: string): ModalRef<any> | undefined {
    return this.openModals.find((Modal) => Modal.id === id);
  }

  public ngOnDestroy() {
    this._closeModals(this._openModalsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
  }

  private _createOverlay(config: ConfigModal): OverlayRef {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private _getOverlayConfig(configModal: ConfigModal): OverlayConfig {
    if (configModal.fullscreen) {
      configModal.width = '100%';
      configModal.height = '100%';
      configModal.maxWidth = '100%';
      configModal.maxHeight = '100%';
      configModal.closeOnNavigation = false;
      if (Array.isArray(configModal.panelClass)) {
        configModal.panelClass.push('-fullscreen');
      } else {
        configModal.panelClass = [
          `${configModal.panelClass || ''}`,
          '-fullscreen',
        ];
      }
    }

    const state = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: configModal.scrollStrategy || this._scrollStrategy(),
      panelClass: configModal.panelClass,
      hasBackdrop: configModal.hasBackdrop,
      direction: configModal.direction,
      minWidth: configModal.minWidth,
      minHeight: configModal.minHeight,
      maxWidth: configModal.maxWidth,
      maxHeight: configModal.maxHeight,
      disposeOnNavigation: configModal.closeOnNavigation,
    });

    if (configModal.backdropClass) {
      state.backdropClass = configModal.backdropClass;
    }

    return state;
  }

  private _attachModalContainer(overlay: OverlayRef, config: ConfigModal): C {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: ConfigModal, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      this._modalContainerType,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );
    const containerRef = overlay.attach<C>(containerPortal);

    return containerRef.instance;
  }

  private _attachModalContent<T, R>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    modalContainer: C,
    overlayRef: OverlayRef,
    config: ConfigModal
  ): ModalRef<T, R> {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new this._modalRefConstructor(
      overlayRef,
      modalContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, <any>{
          $implicit: config.data,
          dialogRef,
        })
      );
    } else {
      const injector = this._createInjector<T>(
        config,
        dialogRef,
        modalContainer
      );
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );
      dialogRef.componentInstance = contentRef.instance;
    }

    dialogRef
      .updateSize({ width: config.width, height: config.height })
      .updatePosition(config.position);

    return dialogRef;
  }

  private _createInjector<T>(
    config: ConfigModal,
    modalRef: ModalRef<T>,
    modalContainer: C
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The dialog container should be provided as the dialog container and the dialog's
    // content are created out of the same `ViewContainerRef` and as such, are siblings
    // for injector purposes. To allow the hierarchy that is expected, the dialog
    // container is explicitly provided in the injector.
    const providers: StaticProvider[] = [
      { provide: this._modalContainerType, useValue: modalContainer },
      { provide: this._modalDataToken, useValue: config.data },
      { provide: this._modalRefConstructor, useValue: modalRef },
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
      parent: userInjector || this._injector,
      providers,
    });
  }

  private _removeOpenDialog(modalRef: ModalRef<any>) {
    const index = this.openModals.indexOf(modalRef);

    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this._ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });

        this._ariaHiddenElements.clear();
        this._getAfterAllClosed().next();
      }
    }
  }

  private _hideNonDialogContentFromAssistiveTechnology() {
    const overlayContainer = this._overlayContainer.getContainerElement();

    // Ensure that the overlay container is attached to the DOM.
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;

      for (let i = siblings.length - 1; i > -1; i--) {
        let sibling = siblings[i];

        if (
          sibling !== overlayContainer &&
          sibling.nodeName !== 'SCRIPT' &&
          sibling.nodeName !== 'STYLE' &&
          !sibling.hasAttribute('aria-live')
        ) {
          this._ariaHiddenElements.set(
            sibling,
            sibling.getAttribute('aria-hidden')
          );
          sibling.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  private _closeModals(Modals: ModalRef<any>[]) {
    let i = Modals.length;

    while (i--) {
      Modals[i].close();
    }
  }
}

@Injectable()
export class ModalService extends ModalBase<ModalContainer> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional()
    @Inject(MODAL_DEFAULT_OPTIONS)
    defaultOptions: ConfigModal,
    @Inject(MODAL_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() @SkipSelf() parentDialog: ModalService,
    overlayContainer: OverlayContainer
  ) {
    super(
      overlay,
      injector,
      defaultOptions,
      parentDialog,
      overlayContainer,
      scrollStrategy,
      ModalRef,
      ModalContainer,
      MODAL_DATA
    );
  }
}

function _applyConfigDefaults(
  config?: ConfigModal,
  defaultOptions?: ConfigModal
): ConfigModal {
  return { ...defaultOptions, ...config };
}
