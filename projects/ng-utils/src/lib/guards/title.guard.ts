import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TitleGuard implements CanActivate {
  constructor(private title: Title, private configService: ConfigService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const suffix = this.configService.config?.guards?.title?.suffix as string;
    const divider = this.configService.config?.guards?.title?.divider as string;

    this.title.setTitle(
      !!next.data.title ? `${next.data.title} ${divider} ${suffix}` : suffix
    );

    return true;
  }
}
