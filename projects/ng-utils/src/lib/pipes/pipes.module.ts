import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ElsePipe } from './else.pipe';
import { IfElsePipe } from './if-else.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { TimeToDatePipe } from './time-to-date.pipe';
import { ParserDatePipe } from './parser-date.pipe';
import { MaskedPipe } from './masked.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ElsePipe,
    IfElsePipe,
    MaskedPipe,
    TimeToDatePipe,
    ParserDatePipe,
    DomSanitizerPipe,
    RelativeTimePipe,
  ],
  exports: [
    ElsePipe,
    IfElsePipe,
    MaskedPipe,
    TimeToDatePipe,
    ParserDatePipe,
    DomSanitizerPipe,
    RelativeTimePipe,
  ],
})
export class PipesModule {}
