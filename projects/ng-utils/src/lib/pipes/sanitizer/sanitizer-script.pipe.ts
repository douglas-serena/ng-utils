import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'sanitizerScript' })
export class SanitizerScriptPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(script: string) {
    return this.domSanitizer.bypassSecurityTrustScript(script);
  }
}
