import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config/config.service';
import { IConfig } from './config/interfaces/config.interface';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class NgUtilsModule {
  static forRoot(config?: Partial<IConfig>): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsModule,
      providers: [
        ConfigService,
        {
          provide: CONFIG_TOKEN,
          useValue: config,
        },
        {
          provide: ConfigService,
          useFactory: provideConfig,
          deps: [CONFIG_TOKEN],
        },
      ],
    };
  }
}

export var CONFIG_TOKEN = new InjectionToken<ConfigService>(
  'forRoot() ConfigService() configuration.'
);

export function provideConfig(config?: IConfig): ConfigService {
  const service = new ConfigService();
  if (config) {
    service.setConfig(config);
  }

  return service;
}
