import { IConfig } from './interfaces/config.interface';

export const defaultConfig: IConfig = {
  columnType: 'bootstrap',
  guards: {
    auth: { redirectLoggedOut: ['/login'] },
    logged: { redirectLogged: ['/'] },
    title: { divider: '-', suffix: 'Angular' },
  },
  services: {
    auth: { nameSaveToken: '_token_jwt', redirectLogout: ['/login'] },
    http: { apiUrl: '', removeIdSave: true, removeIdPost: true },
    translate: {
      language: {
        default: 'en',
        useSaved: true,
        useNavigator: true,
        nameSave: '_locale_language',
      },
      path: '/assets/i18n',
      suffix: '.json',
    },
  },
};
