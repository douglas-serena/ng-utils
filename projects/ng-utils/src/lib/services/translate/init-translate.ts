import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { configuration } from './../../configuration/constants/configuration.constant';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function initTranslate(
  httpClientService: HttpClient,
  translateService: TranslateService
) {
  return () =>
    new Promise<boolean>((resolve: (res: boolean) => void) => {
      const { language, path, suffix } = configuration.services.translate!;

      const defaultLanguage = language?.default!;
      let locale = defaultLanguage;

      if (language?.useNavigator) {
        locale = translateService.getBrowserLang() || locale;
      }
      if (language?.useSaved) {
        locale = localStorage.getItem(language?.nameSave!) || locale;
      }

      httpClientService
        .get(`${path}/${locale}${suffix}`)
        .pipe(catchError(() => of(null)))
        .subscribe((response: any) => {
          translateService.setTranslation(defaultLanguage, response || {});
          translateService.setDefaultLang(defaultLanguage);
          translateService.use(locale);

          resolve(true);
        });
    });
}
