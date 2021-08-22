import { EventEmitter, Injectable } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
  RoutesRecognized,
} from '@angular/router';
import { isInstanceof } from '@douglas-serena/utils';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonValidation } from '../../validations/common.validation';

@Injectable({ providedIn: 'root' })
export class RouteChangeService {
  navigationStart = new EventEmitter<NavigationStart>();
  routesRecognized = new EventEmitter<RoutesRecognized>();
  guardsCheckStart = new EventEmitter<GuardsCheckStart>();
  guardsCheckEnd = new EventEmitter<GuardsCheckEnd>();
  navigationEnd = new EventEmitter<NavigationEnd>();

  constructor(private router: Router) {}

  public async load() {
    (this.router.events as Observable<RouterEvent>)
      .pipe(filter((event) => isInstanceof(event, RouterEvent)))
      .subscribe((event: object) => {
        if (isInstanceof(event, NavigationStart)) {
          this.navigationStart.emit(event);
        }
        if (isInstanceof(event, RoutesRecognized)) {
          this.routesRecognized.emit(event);
        }
        if (isInstanceof(event, GuardsCheckStart)) {
          this.guardsCheckStart.emit(event);
        }
        if (isInstanceof(event, GuardsCheckEnd)) {
          this.guardsCheckEnd.emit(event);
        }
        if (isInstanceof(event, NavigationEnd)) {
          this.navigationEnd.emit(event);
        }
      });

    CommonValidation.eventDestroyListener = this.navigationEnd;
  }
}
