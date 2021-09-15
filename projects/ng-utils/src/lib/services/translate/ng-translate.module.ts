import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgTranslateService } from './ng-translate.service';

@NgModule({
  imports: [CommonModule, TranslateModule.forRoot()],
  providers: [HttpClient, NgTranslateService],
})
export class NgTranslateModule {}
