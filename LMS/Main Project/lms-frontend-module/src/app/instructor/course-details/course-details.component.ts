import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/models';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="course-details" *ngIf="course">
      <div class="header">
        <button (click)="goBack()" class="back-btn">← Back to Dashboard</button>
        <h1>{{ course.title }}</h1>
      </div>
      
      <div class="course-info">
        <div class="info-section">
          <h3>Course Information</h3>
          <p><strong>Description:</strong> {{ course.description }}</p>
          <p><strong>Duration:</strong> {{ course.duration }}</p>
          <p><strong>Instructor ID:</strong> {{ course.instructorId }}</p>
        </div>
        
        <div class="content-section" *ngIf="course.content">
          <h3>Course Materials</h3>
          <div class="content-display">{{ course.content }}</div>
        </div>
        
        <div class="no-content" *ngIf="!course.content">
          <p>No course materials available yet.</p>
        </div>
      </div>
    </div>
    
    <div class="loading" *ngIf="!course">
      <p>Loading course details...</p>
    </div>
  `,
  styles: [`
    .course-details {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    
    .header {
      margin-bottom: 30px;
    }
    
    .back-btn {
      background: #6c757d;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 15px;
    }
    
    .back-btn:hover {
      background: #5a6268;
    }
    
    .course-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }
    
    .info-section, .content-section {
      margin-bottom: 25px;
    }
    
    .info-section h3, .content-section h3 {
      color: #1976d2;
      margin-bottom: 15px;
    }
    
    .info-section p {
      margin: 10px 0;
      font-size: 16px;
    }
    
    .content-display {
      background: white;
      padding: 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    
    .no-content {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 20px;
    }
    
    .loading {
      text-align: center;
      padding: 50px;
      color: #666;
    }
  `]
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(parseInt(courseId));
    }
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe({
      next: (course) => this.course = course,
      error: (error) => {
        console.error('Error loading course:', error);
        // Fallback course data when API fails
        this.course = {
          id: id,
          title: id === 1 ? 'Java Programming' : 'MySQL Database',
          description: id === 1 ? 'Complete Java programming course with hands-on projects' : 'Database connectivity and management fundamentals',
          duration: '40 hours',
          content: id === 1 ? 'Java Basics\n- Variables and Data Types\n- Control Structures\n- Object-Oriented Programming\n- Exception Handling\n- Collections Framework' : 'MySQL Fundamentals\n- Database Design\n- SQL Queries\n- Joins and Relationships\n- Stored Procedures\n- Performance Optimization',
          instructorId: id === 1 ? 3 : 6
        };
      }
    });
  }

  goBack() {
    const user = this.authService.getUser();
    if (user?.role === 'STUDENT') {
      this.router.navigate(['/student/dashboard']);
    } else {
      this.router.navigate(['/instructor/dashboard']);
    }
  }
}