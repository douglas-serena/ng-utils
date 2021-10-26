import { AnimationEvent } from '@angular/animations';
import {
  ConfigurableFocusTrapFactory,
  FocusMonitor,
  FocusOrigin,
  FocusTrap,
  InteractivityChecker,
} from '@angular/cdk/a11y';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  HostListener,
  Inject,
  NgZone,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalAnimations } from './modal.animations';
import { ConfigModal } from './modal.config';

interface ModalAnimationEvent {
  state: 'opened' | 'opening' | 'closing' | 'closed';
  totalTime: number;
}

@Directive()
export class ModalContainerBase extends BasePortalOutlet {
  private _focusTrap!: FocusTrap;
  private _elementFocusedBeforeDialogWasOpened: HTMLElement | null = null;
  private _ariaLabelledBy: string | null;

  public id!: string;
  public closeInteractionType: FocusOrigin | null = null;
  public animationStateChanged = new EventEmitter<ModalAnimationEvent>();
  @ViewChild(CdkPortalOutlet, { static: true })
  public portalOutlet!: CdkPortalOutlet;

  constructor(
    protected _elementRef: ElementRef,
    protected _focusTrapFactory: ConfigurableFocusTrapFactory,
    protected _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(DOCUMENT) protected document: any,
    public config: ConfigModal,
    private readonly _interactivityChecker: InteractivityChecker,
    private readonly _ngZone: NgZone,
    private _focusMonitor?: FocusMonitor
  ) {
    super();
    this._ariaLabelledBy = config.ariaLabelledBy || null;
  }

  protected _startExitAnimation = () => {};

  public initializeWithAttachedContent() {
    if (this.config.focusTrap) {
      this._setupFocusTrap();
      this._capturePreviouslyFocusedElement();
      this._focusDialogContainer();
    }
  }

  public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach modal content after content is already attached'
      );
    }
    return this.portalOutlet.attachComponentPortal(portal);
  }

  public attachTemplatePortal<C>(
    portal: TemplatePortal<C>
  ): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach modal content after content is already attached'
      );
    }
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  public attachDomPortal = (portal: DomPortal) => {
    if (this.portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach modal content after content is already attached'
      );
    }
    return this.portalOutlet.attachDomPortal(portal);
  };

  public recaptureFocus() {
    if (!this.containsFocus()) {
      this._trapFocus();
    }
  }

  protected _trapFocus() {
    if (!this.config.focusTrap) {
      return;
    }

    const element = this._elementRef.nativeElement;
    switch (this.config.autoFocus) {
      case false:
      case 'dialog':
        if (!this.containsFocus()) {
          element.focus();
        }
        break;
      case true:
      case 'first-tabbable':
        this._focusTrap.focusInitialElementWhenReady();
        break;
      case 'first-heading':
        this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
        break;
      default:
        this._focusByCssSelector(this.config.autoFocus!);
        break;
    }
  }

  public _restoreFocus() {
    const previousElement = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (
      this.config.restoreFocus &&
      previousElement &&
      typeof previousElement.focus === 'function'
    ) {
      const activeElement = _getFocusedElementPierceShadowDom();
      const element = this._elementRef.nativeElement;

      if (
        !activeElement ||
        activeElement === this.document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        if (this._focusMonitor) {
          this._focusMonitor.focusVia(
            previousElement,
            this.closeInteractionType
          );
          this.closeInteractionType = null;
        } else {
          previousElement.focus();
        }
      }
    }

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }
  private _setupFocusTrap() {
    this._focusTrap = this._focusTrapFactory.create(
      this._elementRef.nativeElement
    );
  }

  private _capturePreviouslyFocusedElement() {
    if (this.document) {
      this._elementFocusedBeforeDialogWasOpened =
        _getFocusedElementPierceShadowDom();
    }
  }

  private _focusDialogContainer() {
    if (this._elementRef.nativeElement.focus) {
      this._elementRef.nativeElement.focus();
    }
  }

  private _forceFocus(element: HTMLElement, options?: FocusOptions) {
    if (!this._interactivityChecker.isFocusable(element)) {
      element.tabIndex = -1;
      // The tabindex attribute should be removed to avoid navigating to that element again
      this._ngZone.runOutsideAngular(() => {
        element.addEventListener('blur', () =>
          element.removeAttribute('tabindex')
        );
        element.addEventListener('mousedown', () =>
          element.removeAttribute('tabindex')
        );
      });
    }
    element.focus(options);
  }

  private _focusByCssSelector(selector: string, options?: FocusOptions) {
    let elementToFocus = this._elementRef.nativeElement.querySelector(
      selector
    ) as HTMLElement | null;
    if (elementToFocus) {
      this._forceFocus(elementToFocus, options);
    }
  }

  private containsFocus() {
    const element = this._elementRef.nativeElement;
    const activeElement = _getFocusedElementPierceShadowDom();
    return element === activeElement || element.contains(activeElement);
  }
}

@Component({
  selector: 'ng-modal-container',
  template: `<ng-template cdkPortalOutlet></ng-template>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['modal.container.scss'],
  animations: [ModalAnimations.modalContainer],

  host: {
    class: 'ng-modal-container',
    tabindex: '-1',
    'aria-modal': 'true',
    '[id]': 'id',
    '[attr.role]': 'config.role',
    '[attr.aria-labelledby]': 'config.ariaLabel ? null : _ariaLabelledBy',
    '[attr.aria-label]': 'config.ariaLabel',
    '[attr.aria-describedby]': 'config.ariaDescribedBy || null',
    '[@modalContainer]': 'state',
    '(@modalContainer.start)': 'onAnimationStart($event)',
    '(@modalContainer.done)': 'onAnimationDone($event)',
  },
})
export class ModalContainer extends ModalContainerBase {
  /** State of the dialog animation. */
  public state: 'void' | 'enter' | 'exit' = 'enter';

  public onAnimationDone({ toState, totalTime }: AnimationEvent) {
    if (toState === 'enter') {
      this._trapFocus();
      this.animationStateChanged.next({ state: 'opened', totalTime });
    } else if (toState === 'exit') {
      this._restoreFocus();
      this.animationStateChanged.next({ state: 'closed', totalTime });
    }
  }

  public onAnimationStart({ toState, totalTime }: AnimationEvent) {
    if (toState === 'enter') {
      this.animationStateChanged.next({ state: 'opening', totalTime });
    } else if (toState === 'exit' || toState === 'void') {
      this.animationStateChanged.next({ state: 'closing', totalTime });
    }
  }

  public startExitAnimation(): void {
    this.state = 'exit';
    this._changeDetectorRef.markForCheck();
  }
}
