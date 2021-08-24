import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleTry } from '@douglas-serena/utils';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  constructor(
    private configService: ConfigService,
    private translateService: TranslateService,
    private httpClientService: HttpClient
  ) {}

  async changeLanguage(language: string) {
    const {
      path,
      suffix,
      language: _language,
    } = this.configService.config.services?.translate!;

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
