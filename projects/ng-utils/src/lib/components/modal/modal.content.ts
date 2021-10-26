import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { ModalRef, closeModalVia } from './modal.ref';
import { ModalService } from './modal.service';

@Directive({
  selector: '[modal-close], [modalClose]',
  exportAs: 'modalClose',
  host: {
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.type]': 'type',
  },
})
export class ModalClose implements OnInit, OnChanges {
  @Input('aria-label') public ariaLabel: string = '';
  @Input() public type: 'submit' | 'button' | 'reset' = 'button';
  private modalResult: any;

  @Input('modal-close') public set 'modal-close'(result: any) {
    this.modalResult = result;
  }
  @Input('modalClose') public set modalClose(result: any) {
    this.modalResult = result;
  }

  constructor(
    @Optional() public modalRef: ModalRef<any>,
    private elementRef: ElementRef<HTMLElement>,
    private modalService: ModalService
  ) {}

  public ngOnInit() {
    if (!this.modalRef) {
      this.modalRef = getClosestModal(
        this.elementRef,
        this.modalService.openModals
      )!;
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    const proxiedChange =
      changes['_ngModalClose'] || changes['_ngModalCloseResult'];

    if (proxiedChange) {
      this.modalResult = proxiedChange.currentValue;
    }
  }

  @HostListener('click', ['$event'])
  public click(event: MouseEvent) {
    closeModalVia(
      this.modalRef,
      event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse',
      this.modalResult
    );
  }
}

@Directive({
  selector: `[modal-drag], modal-drag, [modalDrag]`,
  host: { class: 'ng-modal-drag' },
})
export class ModalDrag {
  public startOffsetX = 0;
  public startOffsetY = 0;

  constructor(
    @Optional() public modalRef: ModalRef<any>,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('mousedown', ['$event.clientX', '$event.clientY'])
  @HostListener('touchstart', [
    '$event.touches[0].clientX',
    '$event.touches[0].clientY',
  ])
  public down(x: number, y: number) {
    const move = (event: MouseEvent | TouchEvent) => {
      let offsetX =
        event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      let offsetY =
        event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

      // this.modalRef.updatePosition({
      //   top: `${offsetY - 20}px`,
      //   left: `${offsetX - 20}px`,
      // });
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };

    this.startOffsetX = x;
    this.startOffsetY = y;

    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
  }
}

@Directive({
  selector: `[modal-content], modal-content, [modalContent]`,
  host: { class: 'ng-modal-content', '[class.-padding]': 'padding' },
})
export class ModalContent {
  @Input() padding = true;
}

@Directive({
  selector: `[modal-header], modal-header, [modalHeader]`,
  host: { class: 'ng-modal-header', '[class.-padding]': 'padding' },
})
export class ModalHeader {
  @Input() padding = true;
}

@Directive({
  selector: `[modal-actions], modal-actions, [modalActions]`,
  host: { class: 'ng-modal-actions', '[class.-padding]': 'padding' },
})
export class ModalActions {
  @Input() padding = true;
}

function getClosestModal(
  element: ElementRef<HTMLElement>,
  openModals: ModalRef<any>[]
) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('ng-modal-container')) {
    parent = parent.parentElement;
  }

  return parent ? openModals.find((dialog) => dialog.id === parent!.id) : null;
}
