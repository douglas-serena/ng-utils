import { ActivatedRoute, Router } from '@angular/router';

export interface IConfigBase {
  [key: string]: any;
  router?: Router;
  activatedRoute?: ActivatedRoute;
  handle?: {
    error?: (error: Error) => void;
    [key: string]: any;
  };
}
