import { OnDestroy } from '@angular/core';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[expand]',
})
export class ExpandDirective implements OnDestroy {
  elementRef: HTMLElement;
  open: boolean = false;
  $eventResize = () => this.resize();

  @Input() set expand(open: boolean) {
    this.open = open;
    this.resize();
  }

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef.nativeElement;
    window.addEventListener('resize', this.$eventResize);
  }

  resize() {
    if (this.open) {
      this.elementRef.style.maxHeight = `${this.elementRef.scrollHeight}px`;
    } else {
      this.elementRef.style.maxHeight = `0px`;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.$eventResize);
  }
}
