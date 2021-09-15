import { $extends } from '@douglas-serena/utils';
import { ngUtilsConfig } from './config.default';
import { INgUtilsConfig } from './interfaces/config.interface';

export const NgUtilsConfig = {
  get() {
    return ngUtilsConfig;
  },
  set(config: INgUtilsConfig) {
    $extends(ngUtilsConfig, config);
  },
};
