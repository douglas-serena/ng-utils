import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerHtml',
})
export class SanitizerHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(html: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
