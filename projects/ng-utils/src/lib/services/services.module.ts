import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [],
  providers: [],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ServicesModule,
      providers: [],
    };
  }
}
