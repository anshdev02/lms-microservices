import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceHealthService {
  
  private healthEndpoints = {
    'auth-service': 'http://localhost:8600/auth/actuator/health',
    'user-service': 'http://localhost:8600/users/actuator/health',
    'course-service': 'http://localhost:8600/courses/actuator/health',
    'enrollment-service': 'http://localhost:8600/enroll/actuator/health',
    'assessment-service': 'http://localhost:8600/assessments/actuator/health'
  };

  constructor(private http: HttpClient) {}

  checkServiceHealth(serviceName: string): Observable<boolean> {
    return of(true);
  }

  isServiceError(error: HttpErrorResponse): boolean {
    return error.status === 0 || error.status >= 500 || 
           error.message.includes('Connection refused') ||
           error.message.includes('timeout');
  }

  getServiceNameFromUrl(url: string): string {
    if (url.includes('/auth')) return 'auth-service';
    if (url.includes('/users')) return 'user-service';
    if (url.includes('/courses')) return 'course-service';
    if (url.includes('/enroll')) return 'enrollment-service';
    if (url.includes('/assessments')) return 'assessment-service';
    return 'unknown-service';
  }
}