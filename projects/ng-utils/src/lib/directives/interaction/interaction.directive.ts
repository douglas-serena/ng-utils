import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[interaction]',
})
export class InteractionDirective {
  element: HTMLElement;

  @Output() interaction = new EventEmitter();

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  @HostListener('click')
  @HostListener('keyup.enter')
  handleInteraction(event: Event) {
    this.interaction.emit(event);
  }
}
