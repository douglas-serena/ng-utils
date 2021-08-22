import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouteChangeService } from './route-change.service';

@NgModule({
  imports: [],
  providers: [RouteChangeService],
})
export class RouteChangeModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: RouteChangeModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (eventRouter: RouteChangeService) => () =>
            eventRouter.load(),
          deps: [RouteChangeService],
          multi: true,
        },
      ],
    };
  }
}
