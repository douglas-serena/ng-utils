import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { AuthJwtService } from './auth-jwt.service';
import { AuthJwtInterceptor } from './auth-jwt.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [HttpService, AuthJwtService, AuthJwtInterceptor],
})
export class HttpModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: HttpModule,
      providers: [HttpService, AuthJwtService, AuthJwtInterceptor],
    };
  }
}
