import { ComponentType } from '@angular/cdk/portal';
import { IConfigControl } from '../../../controls/@types/interfaces/config-control.interface';

export interface IConfigUtils {
  columnType: 'bootstrap' | 'materialize';
  guards: {
    auth: { redirectLoggedOut: string[] };
    logged: { redirectLogged: string[] };
    title: { divider: string; suffix: string };
  };
  services: {
    auth: {
      validExpired: boolean;
      nameSaveToken: string;
      redirectLogout: string[];
    };
    http: { apiUrl: string; removeIdSave: boolean; removeIdPost: boolean };
    translate: {
      path: string;
      suffix: string;
      language: {
        default: string;
        nameSave: string;
        useSaved: boolean;
        useNavigator: boolean;
      };
    };
  };
  directives: {
    /** @deprecated */
    buttonLoading: { componentLoading?: ComponentType<any> };
  };
  components: {
    loading: {
      component?: ComponentType<any>;
      config?: unknown;
      type?: {
        [key: string]: unknown;
      };
    };
  };
  controls: IConfigControl;
}
