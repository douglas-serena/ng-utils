import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class AuthJwtService {
  nameSaveToken!: string;

  constructor(private router: Router, private configService: ConfigService) {
    this.nameSaveToken = configService.config?.services?.auth
      ?.nameSaveToken as string;
  }

  public set token(token) {
    localStorage.setItem(`${this.nameSaveToken}`, token as any);
  }

  public get token(): string {
    return localStorage.getItem(`${this.nameSaveToken}`) as string;
  }

  get tokenDecode() {
    return jwt_decode(this.token) as any;
  }

  get logged() {
    return this.token?.length > 0;
  }

  logout() {
    this.removeToken();
    this.router.navigate(
      this.configService.config?.services?.auth?.redirectLogout as string[]
    );
  }

  removeToken() {
    localStorage.removeItem(`${this.nameSaveToken}`);
  }
}
