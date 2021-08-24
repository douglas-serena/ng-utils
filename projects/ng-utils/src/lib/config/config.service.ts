import { Injectable } from '@angular/core';
import { $extends } from '@douglas-serena/utils';
import { IConfig } from './interfaces/config.interface';
import { defaultConfig } from './config.default';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get config() {
    return defaultConfig;
  }

  setConfig(config: Partial<IConfig>) {
    $extends(defaultConfig, config);
  }
}
