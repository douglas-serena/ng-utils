import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTemplateService } from './services/request.service';
import { NavigatorTemplateService } from './services/navigator.service';
import { FormTemplate } from './form.template';

@NgModule({
  imports: [CommonModule],
  declarations: [FormTemplate],
  providers: [RequestTemplateService, NavigatorTemplateService],
})
export class TemplatesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: TemplatesModule,
      providers: [RequestTemplateService, NavigatorTemplateService],
    };
  }
}
