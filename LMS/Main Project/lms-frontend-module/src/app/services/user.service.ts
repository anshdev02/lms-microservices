import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/models';
import { ServiceHealthService } from './service-health.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:8600/users';

  constructor(
    private http: HttpClient,
    private healthService: ServiceHealthService
  ) {}

  private handleServiceError = (error: HttpErrorResponse) => {
    if (this.healthService.isServiceError(error)) {
      const serviceName = this.healthService.getServiceNameFromUrl(error.url || this.baseUrl);
      return throwError(() => new Error(`${serviceName} is not working. Please try again later.`));
    }
    return throwError(() => error);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      catchError(this.handleServiceError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleServiceError)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(
      catchError(this.handleServiceError)
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user).pipe(
      catchError(this.handleServiceError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleServiceError)
    );
  }
}