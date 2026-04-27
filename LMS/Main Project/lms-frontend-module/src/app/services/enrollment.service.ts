import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {

  private baseUrl = 'http://localhost:8600/enroll';

  constructor(private http: HttpClient) {}

  enroll(studentId: number, courseId: number) {
    return this.http.post(
      `${this.baseUrl}?studentId=${studentId}&courseId=${courseId}`, {}
    );
  }

  createEnrollment(enrollment: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}?studentId=${enrollment.studentId}&courseId=${enrollment.courseId}`, {}
    );
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/course/${courseId}`);
  }
}
