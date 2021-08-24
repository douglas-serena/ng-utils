import { ActivatedRoute } from '@angular/router';
import { NavigatorTemplateService } from '../services/navigator.service';
import { RequestTemplateService } from '../services/request.service';

export interface IFormTemplateConfig {
  requestService?: RequestTemplateService;
  navigatorService?: NavigatorTemplateService;
  activatedRoute?: ActivatedRoute;
  handle?: {
    error?: (error: Error) => void;
    success?: () => void;
  };
}

export interface IFormTemplate {}
