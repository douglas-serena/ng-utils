import { FocusOrigin } from '@angular/cdk/a11y';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ModalPosition } from './modal.config';
import { ModalContainer } from './modal.container';

const enum MODAL_STATE {
  OPEN = 0,
  CLOSING = 1,
  CLOSED = 2,
}

export class ModalRef<T, R = any> {
  public static UNIQUE_ID = 0;

  private _result: R | undefined;
  private state = MODAL_STATE.OPEN;
  private _closeFallbackTimeout: any = 0;
  private readonly _afterOpened = new Subject<void>();
  private readonly _afterClosed = new Subject<R | undefined>();
  private readonly _beforeClosed = new Subject<R | undefined>();

  public componentInstance!: T;
  public disableClose: boolean | undefined =
    this.containerInstance.config.disableClose;

  constructor(
    private _overlayRef: OverlayRef,
    public containerInstance: ModalContainer,
    readonly id = `modal-ref-${ModalRef.UNIQUE_ID++}`
  ) {
    containerInstance.id = id;

    containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.state === 'opened'),
        take(1)
      )
      .subscribe(() => {
        this._afterOpened.next();
        this._afterOpened.complete();
      });

    containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.state === 'closed'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this._closeFallbackTimeout);
        this._finishModalClose();
      });

    _overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._afterClosed.next(this._result);
      this._afterClosed.complete();
      this.componentInstance = null!;
      this._overlayRef.dispose();
    });

    _overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => {
          return (
            event.keyCode === ESCAPE &&
            !this.disableClose &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe((event) => {
        event.preventDefault();
        closeModalVia(this, 'keyboard');
      });

    _overlayRef.backdropClick().subscribe(() => {
      if (this.disableClose) {
        this.containerInstance.recaptureFocus();
      } else {
        closeModalVia(this, 'mouse');
      }
    });
  }

  public close(result?: R): void {
    this._result = result;

    // Transition the backdrop in parallel to the dialog.
    this.containerInstance.animationStateChanged
      .pipe(
        filter((event) => event.state === 'closing'),
        take(1)
      )
      .subscribe((event) => {
        this._beforeClosed.next(result);
        this._beforeClosed.complete();
        this._overlayRef.detachBackdrop();

        this._closeFallbackTimeout = setTimeout(
          () => this._finishModalClose(),
          event.totalTime + 100
        );
      });

    this.state = MODAL_STATE.CLOSING;
    this.containerInstance.startExitAnimation();
  }

  public afterOpened(): Observable<void> {
    return this._afterOpened;
  }

  public afterClosed(): Observable<R | undefined> {
    return this._afterClosed;
  }

  public beforeClosed(): Observable<R | undefined> {
    return this._beforeClosed;
  }

  public backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  public keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  public updatePosition(position?: ModalPosition): this {
    let strategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.left(position.left)
        : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top
        ? strategy.top(position.top)
        : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  public updateSize(size: { width?: string; height?: string }): this {
    this._overlayRef.updateSize({
      width: size.width || '',
      height: size.height || '',
    });
    this._overlayRef.updatePosition();
    return this;
  }

  public addPanelClass(classes: string | string[]): this {
    this._overlayRef.addPanelClass(classes);
    return this;
  }

  public removePanelClass(classes: string | string[]): this {
    this._overlayRef.removePanelClass(classes);
    return this;
  }

  public getState(): MODAL_STATE {
    return this.state;
  }

  private _finishModalClose() {
    this.state = MODAL_STATE.CLOSED;
    this._overlayRef.dispose();
  }

  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig()
      .positionStrategy as GlobalPositionStrategy;
  }
}

export function closeModalVia<R>(
  ref: ModalRef<R>,
  interactionType: FocusOrigin,
  result?: R
) {
  if (ref.containerInstance !== undefined) {
    ref.containerInstance.closeInteractionType = interactionType;
  }
  return ref.close(result);
}
