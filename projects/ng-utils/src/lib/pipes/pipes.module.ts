import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElsePipe } from './else.pipe';
import { IfElsePipe } from './if-else.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { MaskedPipe } from './masked.pipe';
import { SanitizerScriptPipe } from './sanitizer/sanitizer-script.pipe';
import { SanitizerUrlPipe } from './sanitizer/sanitizer-url.pipe';
import { SanitizerStylePipe } from './sanitizer/sanitizer-style.pipe';
import { SanitizerHtmlPipe } from './sanitizer/sanitizer-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ElsePipe,
    IfElsePipe,
    MaskedPipe,
    RelativeTimePipe,
    SanitizerUrlPipe,
    SanitizerHtmlPipe,
    SanitizerScriptPipe,
    SanitizerStylePipe,
  ],
  exports: [
    ElsePipe,
    IfElsePipe,
    MaskedPipe,
    RelativeTimePipe,
    SanitizerUrlPipe,
    SanitizerHtmlPipe,
    SanitizerScriptPipe,
    SanitizerStylePipe,
  ],
})
export class PipesModule {}
