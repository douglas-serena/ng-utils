import { $extends } from '@douglas-serena/utils';
import { configuration } from './constants/configuration.constant';
import { IConfigUtils } from './@types/interfaces/config-utils.interface';
import { TRecursivePartial } from '../@types/recursive-partial.type';

export const ConfigUtils = {
  get() {
    return configuration;
  },
  set(config: TRecursivePartial<IConfigUtils>) {
    $extends(configuration, config);
  },
};
