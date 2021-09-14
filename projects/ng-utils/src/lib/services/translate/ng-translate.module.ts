import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initTranslate } from './init-translate';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';

@NgModule({
  imports: [CommonModule, TranslateModule.forRoot()],
  providers: [
    HttpClient,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslate,
      deps: [ConfigService, HttpClient, TranslateService],
      multi: true,
    },
  ],
})
export class NgTranslateModule {}
