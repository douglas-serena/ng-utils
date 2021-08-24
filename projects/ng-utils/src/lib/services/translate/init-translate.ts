import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';

export function initTranslate(
  configService: ConfigService,
  httpClientService: HttpClient,
  translateService: TranslateService
) {
  return () =>
    new Promise<boolean>((resolve: (res: boolean) => void) => {
      const { language, path, suffix } =
        configService.config.services?.translate!;
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
