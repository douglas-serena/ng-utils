import { Location } from '@angular/common';
import { Injectable, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ScreenPointsService } from '../services/screen-points/screen-points.service';

@Injectable({
  providedIn: 'root',
})
export class DialogGuard implements CanDeactivate<any> {
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    @Optional() private dialog: MatDialog,
    private screenPointsService: ScreenPointsService
  ) {}

  canDeactivate(
    _: any,
    currentRoute: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      !this.screenPointsService.isMobile ||
      this.dialog.openDialogs.length === 0
    ) {
      return true;
    }

    this.dialog.closeAll();
    return this.dialog.afterAllClosed.pipe(
      first(),
      map(() => {
        const currentUrlTree = this.router.createUrlTree(
          [],
          currentRoute as any
        );
        const currentUrl = currentUrlTree.toString();
        this.location.go(currentUrl);
        return false;
      })
    );
  }
}
