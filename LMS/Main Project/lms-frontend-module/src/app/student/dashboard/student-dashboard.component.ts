import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Enrollment, Course } from '../../models/models';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  enrollments: Enrollment[] = [];
  courses: Course[] = [];
  availableCourses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    console.log('Current user:', user);
    if (user && user.userId) {
      this.enrollmentService
        .getEnrollmentsByStudent(user.userId)
        .subscribe({
          next: (data: Enrollment[]) => {
            console.log('Enrollments loaded:', data);
            this.enrollments = data;
            this.loadCourseDetails();
            this.loadAvailableCourses();
          },
          error: (error) => {
            console.error('Error loading enrollments:', error);
            this.enrollments = [];
            this.loadAvailableCourses();
          }
        });
    }
  }

  loadCourseDetails() {
    // Get all courses at once instead of individual calls
    this.courseService.getAllCourses().subscribe({
      next: (allCourses) => {
        console.log('All courses loaded:', allCourses);
        // Filter courses that the student is enrolled in
        const enrolledCourseIds = this.enrollments.map(e => e.courseId);
        this.courses = allCourses.filter(course => 
          course.id && enrolledCourseIds.includes(course.id)
        );
        console.log('Filtered enrolled courses:', this.courses);
        
        // Update enrollments to only include courses that still exist
        const existingCourseIds = this.courses.map(c => c.id);
        this.enrollments = this.enrollments.filter(enrollment => 
          existingCourseIds.includes(enrollment.courseId)
        );
        console.log('Updated enrollments:', this.enrollments);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        // Clear courses and enrollments on error
        this.courses = [];
        this.enrollments = [];
      }
    });
  }

  getCourse(courseId: number): Course | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/student/course-details', courseId]);
  }

  updateProgress(enrollmentId: number, percentage: number) {
    // This would typically call an API to update progress
    const enrollment = this.enrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
      enrollment.completionPercentage = Math.min(100, Math.max(0, percentage));
    }
  }

  loadAvailableCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (allCourses) => {
        const enrolledCourseIds = this.enrollments.map(e => e.courseId);
        this.availableCourses = allCourses.filter(course => 
          course.id && !enrolledCourseIds.includes(course.id)
        );
      },
      error: (error) => {
        console.error('Error loading available courses:', error);
        this.availableCourses = [];
      }
    });
  }

  enrollInCourse(courseId: number) {
    const user = this.authService.getUser();
    if (!user || !user.userId) return;

    const enrollment = {
      studentId: user.userId,
      courseId: courseId,
      completionPercentage: 0
    };

    this.enrollmentService.createEnrollment(enrollment).subscribe({
      next: () => {
        alert('Successfully enrolled in course!');
        // Refresh data
        this.ngOnInit();
      },
      error: (error: any) => {
        console.error('Error enrolling in course:', error);
        alert('Error enrolling in course.');
      }
    });
  }

}
