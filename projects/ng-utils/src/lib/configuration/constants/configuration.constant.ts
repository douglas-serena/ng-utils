import { Global } from '@douglas-serena/utils';
import { IConfigUtils } from '../@types/interfaces/config-utils.interface';

export const configuration: IConfigUtils = Global.defined<any>('NG_UTILS', {
  columnType: 'bootstrap',
  guards: {
    auth: { validExpired: true, redirectLoggedOut: ['/login'] },
    logged: { redirectLogged: ['/'] },
    title: { divider: '-', suffix: 'Angular' },
  },
  services: {
    auth: { nameSaveToken: '_token_jwt', redirectLogout: ['/login'] },
    http: { apiUrl: '', removeIdSave: true, removeIdPost: true },
    translate: {
      path: '/assets/i18n',
      suffix: '.json',
      language: {
        default: 'en',
        useSaved: true,
        useNavigator: false,
        nameSave: '_locale_language',
      },
    },
  },
  directives: {
    buttonLoading: {
      componentLoading: undefined,
    },
  },
  controls: {
    control: {},
  },
});
