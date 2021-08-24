import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { INavigatorTemplate } from '../interfaces/services/navigator.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigatorTemplateService implements INavigatorTemplate {
  constructor(private router: Router) {}

  navigator(url: string[], options?: NavigationExtras) {
    this.router.navigate(url, {
      ...options,
    });
  }
}
