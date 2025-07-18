import { Injectable } from '@angular/core';
import { API_CONSTANTS } from '../constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = API_CONSTANTS.BASE_URL;
  private readonly tokenKey = API_CONSTANTS.TOKEN_KEY;
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(tokenKey: string): void {
    localStorage.setItem(this.tokenKey, tokenKey);
    this.tokenSubject.next(tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject;
  }
}
