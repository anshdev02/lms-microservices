import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/models';
import { ServiceHealthService } from './service-health.service';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:8601/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private healthService: ServiceHealthService
  ) {}

  login(username: string, password: string) {
    return this.http.post<User>(`${this.baseUrl}/login`, {
      username,
      password
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.healthService.isServiceError(error)) {
          const serviceName = this.healthService.getServiceNameFromUrl(error.url || this.baseUrl);
          return throwError(() => new Error(`${serviceName} is not working. Please try again later.`));
        }
        return throwError(() => error);
      })
    );
  }

  register(username: string, password: string, role: string) {
    return this.http.post<any>(`${this.baseUrl}/register`, {
      username,
      password,
      role
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.healthService.isServiceError(error)) {
          const serviceName = this.healthService.getServiceNameFromUrl(error.url || this.baseUrl);
          return throwError(() => new Error(`${serviceName} is not working. Please try again later.`));
        }
        return throwError(() => error);
      })
    );
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
