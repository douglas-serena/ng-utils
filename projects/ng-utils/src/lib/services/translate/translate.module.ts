import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslateModule as NgxTranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { initTranslate } from './init-translate';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';

@NgModule({
  imports: [CommonModule, NgxTranslateModule.forRoot()],
  exports: [NgxTranslateModule],
  providers: [
    HttpClient,
    TranslateService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initTranslate,
      deps: [ConfigService, HttpClient, TranslateService],
      multi: true,
    },
  ],
})
export class NgTranslateModule {
  // static forRoot(): ModuleWithProviders<any> {
  //   return {
  //     ngModule: ,
  //     providers: [],
  //   };
  // }
}
