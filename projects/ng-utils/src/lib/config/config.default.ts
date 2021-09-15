import { INgUtilsConfig } from './interfaces/config.interface';

export const ngUtilsConfig: INgUtilsConfig = {
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
        useNavigator: false,
        nameSave: '_locale_language',
      },
      path: '/assets/i18n',
      suffix: '.json',
    },
  },
};
