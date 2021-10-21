import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Params } from '@angular/router';
import { handleTry } from '@douglas-serena/utils';
import { Observable } from 'rxjs';
import { IConfigBase } from './@types/interfaces/base.interface';
import { convertTypes } from './utils/convert-types';

export class BaseTemplate<GenericConfig extends IConfigBase> {
  public form!: FormGroup;
  public formBuilder = FormBuilder.prototype;
  public get controls() {
    return this.form.controls;
  }

  private _config?: GenericConfig;

  public _query?: Params;
  get query() {
    if (!this._query) {
      throw new Error(
        '[TEMPLATE CONFIG] Adicione o "activatedRouter" nas configurações da classe.'
      );
    }
    return this._query;
  }

  public _params?: Params;
  get params() {
    if (!this._params) {
      throw new Error(
        '[TEMPLATE CONFIG] Adicione o "activatedRouter" nas configurações da classe.'
      );
    }
    return this._params;
  }

  public loading = false;

  constructor(config?: GenericConfig) {
    if (config) {
      this.config(config);
    }
  }

  config(config: GenericConfig) {
    this._config = config;
    if (this._config.activatedRoute) {
      this._query = convertTypes(this._config.activatedRoute.snapshot.params);
      this._params = convertTypes(
        this._config.activatedRoute.snapshot.queryParams
      );
    }
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

  subgroup(group: string): FormGroup {
    return this.controls[group] as FormGroup;
  }

  async handleHttp<T = unknown>(
    request: Observable<T> | Promise<T>,
    load = true
  ): Promise<[null | T, null | any]> {
    if (load) {
      this.loading = true;
    }

    const [data, error] = await handleTry(request);
    if (error && this._config?.handle?.error) {
      this._config.handle.error(error);
    }

    if (load) {
      this.loading = false;
    }

    return [data as T, error];
  }

  navigator(url: string[], options?: NavigationExtras) {
    if (!this._config?.router) {
      throw new Error(
        '[TEMPLATE CONFIG] Adicione o "router" nas configurações da classe.'
      );
    }
    this._config.router.navigate(url, {
      ...options,
    });
  }
}
