import { NavigationExtras } from '@angular/router';

export interface INavigatorTemplate {
  navigator(url: string[], options?: NavigationExtras): void;
}
