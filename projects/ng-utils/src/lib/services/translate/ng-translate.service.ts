import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleTry } from '@douglas-serena/utils';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ngUtilsConfig } from '../../config/config.default';

@Injectable({
  providedIn: 'root',
})
export class NgTranslateService {
  constructor(
    private httpClientService: HttpClient,
    private translateService: TranslateService
  ) {}

  async init(config?: any) {
    const { language, path, suffix } = ngUtilsConfig.services?.translate!;

    const defaultLanguage = language?.default!;
    let locale = defaultLanguage;

    if (language?.useNavigator) {
      locale = this.translateService.getBrowserLang() || locale;
    }
    if (language?.useSaved) {
      locale = localStorage.getItem(language?.nameSave!) || locale;
    }

    const [response, error] = await handleTry<any>(
      this.httpClientService.get(`${path}/${locale}${suffix}`)
    );

    if (response) {
      this.translateService.setTranslation(defaultLanguage, response || {});
      this.translateService.setDefaultLang(defaultLanguage);
      this.translateService.use(locale);
    } else {
      console.error(error);
    }
  }

  async changeLanguage(language: string) {
    const {
      path,
      suffix,
      language: _language,
    } = ngUtilsConfig.services?.translate!;

    const includeLanguage = this.translateService.getLangs().includes(language);
    if (!includeLanguage) {
      const [data, error] = await handleTry<Object>(
        this.httpClientService
          .get(`${path}/${language}${suffix}`)
          .pipe(catchError(() => of(null)))
      );

      if (!error) {
        this.translateService.setTranslation(language, data || {});
      }
    }

    this.translateService.use(language);
    if (_language?.useSaved) {
      localStorage.setItem(_language?.nameSave!, language);
    }
  }
}
