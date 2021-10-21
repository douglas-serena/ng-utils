import { Global } from '@douglas-serena/utils';
import { fullscreenDialog } from './fullscreen-dialog';

export const fullscreenMobileDialog = <T = unknown>(config?: T): any => {
  const _config = Global.isMobile ? fullscreenDialog : {};
  return Object.assign({}, config, _config);
};
