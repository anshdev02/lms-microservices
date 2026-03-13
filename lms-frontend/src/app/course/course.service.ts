import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/courses';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
