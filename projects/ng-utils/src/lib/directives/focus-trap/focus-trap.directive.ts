import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[focusTrap]',
})
export class FocusTrapDirective implements AfterViewInit {
  private firstFocusableElement: null | HTMLElement = null;
  private lastFocusableElement: null | HTMLElement = null;

  constructor(private elementRef: ElementRef<any>) {}

  public ngAfterViewInit(): void {
    const focusableElements = this.elementRef.nativeElement.querySelectorAll(`
        [tabindex]:not([tabindex="-1"]),
        a[href]:not([disabled]),
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled])`) as Array<HTMLElement>;

    this.firstFocusableElement = focusableElements[0];
    this.lastFocusableElement = focusableElements[focusableElements.length - 1];
    this.firstFocusableElement.focus();
  }

  @HostListener('keydown', ['$event'])
  public manageTab(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    if (
      event.shiftKey &&
      document.activeElement?.isEqualNode(this.firstFocusableElement)
    ) {
      this.lastFocusableElement?.focus();
      event.preventDefault();
    } else if (document.activeElement?.isEqualNode(this.lastFocusableElement)) {
      this.firstFocusableElement?.focus();
      event.preventDefault();
    }
  }
}
