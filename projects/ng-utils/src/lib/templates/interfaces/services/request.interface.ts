import { Observable } from 'rxjs';

export interface IConfigRequestTemplate {
  handleError?: (error: Error) => void;
  handleSuccess?: () => void;
}

export interface IRequestTemplate {
  handleHttp<T = unknown>(
    request: Observable<T> | Promise<T>
  ): Promise<[null | T, null | any]>;
}
