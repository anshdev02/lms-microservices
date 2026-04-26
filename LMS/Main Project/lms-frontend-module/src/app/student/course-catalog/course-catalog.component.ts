import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/models';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-catalog.component.html',
  styleUrls: ['./course-catalog.component.css']
})

export class CourseCatalogComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses()
      .subscribe((data: Course[]) => this.courses = data);
  }

  enroll(courseId: number) {
    const user = this.authService.getUser();
    if (user && user.userId) {
      this.enrollmentService.enroll(user.userId, courseId)
        .subscribe(() => alert('Enrolled successfully'));
    }
  }
}
