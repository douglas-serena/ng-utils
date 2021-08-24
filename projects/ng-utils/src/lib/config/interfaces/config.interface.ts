export interface IConfig {
  columnType?: 'bootstrap' | 'materialize';
  guards?: {
    auth?: { redirectLoggedOut?: string[] };
    logged?: { redirectLogged?: string[] };
    title?: { divider?: string; suffix?: string };
  };
  services?: {
    auth?: { nameSaveToken?: string; redirectLogout?: string[] };
    http?: { apiUrl?: string; removeIdSave?: boolean; removeIdPost?: boolean };
    translate?: {
      path?: string;
      suffix?: string;
      language?: {
        default?: string;
        nameSave?: string;
        useSaved?: boolean;
        useNavigator?: boolean;
      };
    };
  };
  directives?: {
    buttonLoading?: { componentLoading?: any };
  };
}
