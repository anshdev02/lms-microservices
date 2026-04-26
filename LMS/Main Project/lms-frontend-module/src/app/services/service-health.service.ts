import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceHealthService {
  
  private healthEndpoints = {
    'auth-service': 'http://localhost:8601/actuator/health',
    'user-service': 'http://localhost:8602/actuator/health', 
    'course-service': 'http://localhost:8603/actuator/health',
    'enrollment-service': 'http://localhost:8604/actuator/health',
    'assessment-service': 'http://localhost:8605/actuator/health'
  };

  constructor(private http: HttpClient) {}

  checkServiceHealth(serviceName: string): Observable<boolean> {
    const endpoint = this.healthEndpoints[serviceName as keyof typeof this.healthEndpoints];
    if (!endpoint) return of(false);

    return this.http.get(endpoint, { timeout: 3000 }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  isServiceError(error: HttpErrorResponse): boolean {
    return error.status === 0 || error.status >= 500 || 
           error.message.includes('Connection refused') ||
           error.message.includes('timeout');
  }

  getServiceNameFromUrl(url: string): string {
    if (url.includes(':8601')) return 'auth-service';
    if (url.includes(':8602')) return 'user-service';
    if (url.includes(':8603')) return 'course-service';
    if (url.includes(':8604')) return 'enrollment-service';
    if (url.includes(':8605')) return 'assessment-service';
    return 'unknown-service';
  }
}