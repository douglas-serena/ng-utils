import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormTemplateConfig as IConfigFormTemplate } from './interfaces/form.interface';
import { NavigatorTemplateService } from './services/navigator.service';
import { RequestTemplateService } from './services/request.service';

@Component({
  template: '',
})
export class FormTemplate {
  form!: FormGroup;
  formBuilder = FormBuilder.prototype;
  get controls() {
    return this.form.controls;
  }

  _config!: IConfigFormTemplate;

  query?: Params;
  params?: Params;
  loading = false;

  constructor() {}

  config(config: IConfigFormTemplate) {
    this._config = config;
    this._config.requestService?.use({
      handleError: this._config?.handle?.error,
      handleSuccess: this._config?.handle?.success,
    });
    this.params = this._config.activatedRoute?.snapshot.params;
    this.query = this._config.activatedRoute?.snapshot.queryParams;
  }

  validForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    return this.form.valid;
  }

  formBuild(
    controlsConfig: { [key: string]: any },
    options?: AbstractControlOptions | null | undefined
  ) {
    this.form = this.formBuilder.group(controlsConfig, options);
  }

  getSubGroup(group: string): FormGroup {
    return this.controls[group] as FormGroup;
  }

  async handleHttp<T = unknown>(
    request: Observable<T> | Promise<T>,
    load = true
  ): Promise<[null | T, null | any]> {
    if (!this._config?.requestService) {
      throw new Error(
        `[${RequestTemplateService.name}] Service not configured check your configuration`
      );
    }
    if (load) {
      this.loading = true;
    }

    const [data, error] = await this._config.requestService?.handleHttp?.<T>(
      request
    );
    if (load) {
      this.loading = false;
    }

    return [data, error];
  }

  navigator(url: string[], options?: NavigationExtras | undefined) {
    if (!this._config.navigatorService) {
      throw new Error(
        `[${NavigatorTemplateService.name}] Service not configured check your configuration`
      );
    }
    return this._config.navigatorService?.navigator(url, options);
  }
}
