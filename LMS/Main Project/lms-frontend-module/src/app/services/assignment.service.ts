import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private baseUrl = 'http://localhost:8603/assignments';

  constructor(private http: HttpClient) {}

  createAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.baseUrl, assignment);
  }

  getAssignmentsByCourse(courseId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.baseUrl}/course/${courseId}`);
  }

  getAssignmentById(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${this.baseUrl}/${id}`);
  }

  updateAssignment(id: number, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.baseUrl}/${id}`, assignment);
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}