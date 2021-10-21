import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { configuration } from '../../configuration/public-api';

@Injectable()
export class AuthJwtService {
  private nameSaveToken!: string;

  constructor(private router: Router) {
    this.nameSaveToken = configuration.services.auth.nameSaveToken;
  }

  public set token(token) {
    localStorage.setItem(`${this.nameSaveToken}`, token as any);
  }

  public get token(): string {
    return localStorage.getItem(`${this.nameSaveToken}`) || '';
  }

  public get tokenDecode() {
    return jwt_decode(this.token) as any;
  }

  public get decode() {
    return this.tokenDecode;
  }

  public get logged() {
    if (this.token?.length > 0) {
      if (
        configuration.services.auth.validExpired &&
        Date.now() >= this.decode.exp * 1000
      ) {
        this.removeToken();
        return false;
      }
      return true;
    }

    return false;
  }

  public logout() {
    this.removeToken();
    this.router.navigate(configuration.services.auth.redirectLogout);
  }

  public removeToken() {
    localStorage.removeItem(`${this.nameSaveToken}`);
  }
}
