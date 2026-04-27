import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Course } from '../models/models';
import { ServiceHealthService } from './service-health.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseService {

  private baseUrl = 'http://localhost:8600/courses';

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

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl).pipe(
      catchError(this.handleServiceError)
    );
  }

  getCoursesByInstructor(instructorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/instructor/${instructorId}`).pipe(
      catchError(this.handleServiceError)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleServiceError)
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course).pipe(
      catchError(this.handleServiceError)
    );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course).pipe(
      catchError(this.handleServiceError)
    );
  }

  deleteCourse(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleServiceError)
    );
  }
}
