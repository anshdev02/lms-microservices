import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Assessment {
  id?: number;
  assessmentId?: number;
  title: string;
  description: string;
  courseId: number;
  instructorId: number;
  questions: string;
}

export interface AssessmentSubmission {
  assessmentId: number;
  studentId: number;
}

@Injectable({ providedIn: 'root' })
export class AssessmentService {

  private baseUrl = 'http://localhost:8605/assessments';

  constructor(private http: HttpClient) {}

  getAllAssessments(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.baseUrl);
  }

  getAssessmentById(id: number): Observable<Assessment> {
    return this.http.get<Assessment>(`${this.baseUrl}/${id}`);
  }

  getAssessmentsByCourse(courseId: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.baseUrl}/course/${courseId}`);
  }

  getAssessmentsByInstructor(instructorId: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.baseUrl}/instructor/${instructorId}`);
  }

  createAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(this.baseUrl, assessment);
  }

  updateAssessment(id: number, assessment: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(`${this.baseUrl}/${id}`, assessment);
  }

  submitAssessment(submission: AssessmentSubmission): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, submission);
  }

  isAssessmentCompleted(assessmentId: number, studentId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/completed/${assessmentId}/${studentId}`);
  }

  deleteAssessment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}