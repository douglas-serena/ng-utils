import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { IHttpOption, IHttpRequest } from './interfaces/http-option.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  API_URL!: string;

  get config() {
    return this.configService.config?.services?.http;
  }

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = configService.config?.services?.http?.apiUrl as string;
  }

  get<T = any>(
    path: string,
    idOrOptions?: string | number | IHttpOption,
    options?: IHttpRequest
  ): Observable<T> {
    if (!!idOrOptions) {
      if (typeof idOrOptions === 'string' || typeof idOrOptions === 'number') {
        path = `${path}/${idOrOptions}`;
      } else {
        options = idOrOptions;
      }
    }
    return this.httpClient.get<T>(
      `${this.API_URL}${path}`,
      options
    ) as Observable<T>;
  }

  post<T = any>(
    path: string,
    body?: any,
    options?: IHttpOption
  ): Observable<T> {
    if (!body?.id && this.config?.removeIdPost) {
      delete body?.id;
    }

    return this.httpClient.post<T>(
      `${this.API_URL}${path}`,
      body,
      options
    ) as Observable<T>;
  }

  put<T = any>(
    path: string,
    body?: any,
    idOrOptions?: string | number | IHttpOption,
    options?: IHttpRequest
  ): Observable<T> {
    if (!!idOrOptions) {
      if (
        !(typeof idOrOptions === 'string') ||
        !(typeof idOrOptions === 'number')
      ) {
        options = idOrOptions as IHttpOption;
      }
    }

    return this.httpClient.put<T>(
      `${this.API_URL}${path}`,
      body,
      options
    ) as Observable<T>;
  }

  save<T = any>(
    path: string,
    body: any,
    idOrOptions?: string | number | IHttpRequest,
    options?: IHttpRequest
  ): Observable<T> {
    let method = 'post';
    if (!!idOrOptions) {
      if (typeof idOrOptions === 'string' || typeof idOrOptions === 'number') {
        method = 'put';
      } else {
        options = idOrOptions;
      }
    }

    if (body?.id !== undefined && this.config?.removeIdSave) {
      delete body?.id;
    }

    return this.httpClient.request<T>(method, `${this.API_URL}${path}`, {
      ...options,
      body,
    }) as Observable<T>;
  }

  delete<T = any>(
    path: string,
    idOrOptions?: string | number | IHttpRequest,
    options?: IHttpRequest
  ) {
    if (!!idOrOptions) {
      if (typeof idOrOptions === 'string' || typeof idOrOptions === 'number') {
        path = `${path}/${idOrOptions}`;
      } else {
        options = idOrOptions;
      }
    }
    return this.httpClient.delete<T>(
      `${this.API_URL}${path}`,
      options
    ) as Observable<T>;
  }

  request<T = any>(
    path: string,
    method: 'get' | 'post' | 'put' | 'delete',
    options?: IHttpRequest
  ): Observable<T> {
    return this.httpClient.request(method, path, options) as Observable<T>;
  }

  upload(path: string, form: FormData, options?: IHttpRequest): any {
    const contentHeaders = new HttpHeaders();
    contentHeaders.append('Content-Type', 'multipart/form-data');

    return this.httpClient.request('post', `${this.API_URL}${path}`, {
      body: form,
      observe: 'events',
      reportProgress: true,
      headers: contentHeaders,
      ...options,
    });
  }
}
