import { Injectable } from '@angular/core';
import { handleTry } from '@douglas-serena/utils';
import { Observable } from 'rxjs';
import {
  IConfigRequestTemplate,
  IRequestTemplate,
} from '../interfaces/services/request.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestTemplateService implements IRequestTemplate {
  private config: IConfigRequestTemplate = {};

  constructor() {}

  use(config: IConfigRequestTemplate) {
    this.config = config;
  }

  async handleHttp<T = any>(
    request: Observable<T> | Promise<T>
  ): Promise<[null | T, null | any]> {
    const [data, error] = await handleTry<T>(request);
    if (error) {
      this.config?.handleError?.(error);
    } else {
      this.config?.handleSuccess?.();
    }

    return [data, error];
  }
}
