import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentService, Assessment } from '../../services/assessment.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/models';

@Component({
  selector: 'app-instructor-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Manage Assessments</h2>
      
      <div class="add-assessment-form">
        <h3>{{ editingAssessment ? 'Edit Assessment' : 'Create New Assessment' }}</h3>
        <form (ngSubmit)="saveAssessment()" #assessmentForm="ngForm">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" [(ngModel)]="currentAssessment.title" name="title" required>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea [(ngModel)]="currentAssessment.description" name="description" required rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Course:</label>
            <select [(ngModel)]="currentAssessment.courseId" name="courseId" required>
              <option value="">Select Course</option>
              <option *ngFor="let course of courses" [value]="course.id">{{ course.title }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Questions:</label>
            <textarea [(ngModel)]="currentAssessment.questions" name="questions" placeholder="Enter your questions here..." required rows="6"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="!assessmentForm.form.valid">{{ editingAssessment ? 'Update' : 'Create' }} Assessment</button>
            <button type="button" (click)="cancelEdit()" *ngIf="editingAssessment">Cancel</button>
          </div>
        </form>
      </div>

      <div class="assessments-list">
        <h3>Your Assessments</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let assessment of assessments">
              <td>{{ assessment.title }}</td>
              <td>{{ getCourseName(assessment.courseId) }}</td>
              <td>{{ assessment.description }}</td>
              <td>
                <button (click)="editAssessment(assessment)">Edit</button>
                <button (click)="deleteAssessment(assessment.id!)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .add-assessment-form { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; max-width: 500px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .form-actions button { padding: 10px 20px; margin-right: 10px; border: none; border-radius: 4px; cursor: pointer; }
    .form-actions button[type="submit"] { background: #007bff; color: white; }
    .form-actions button[type="button"] { background: #6c757d; color: white; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: bold; }
    button { padding: 5px 10px; margin-right: 5px; border: none; border-radius: 3px; cursor: pointer; background: #28a745; color: white; }
    .delete-btn { background: #dc3545 !important; }
  `]
})
export class InstructorAssessmentsComponent implements OnInit {
  assessments: Assessment[] = [];
  courses: Course[] = [];
  currentAssessment: Assessment = { title: '', description: '', courseId: 0, instructorId: 0, questions: '' };
  editingAssessment = false;

  constructor(
    private assessmentService: AssessmentService,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAssessments();
    this.loadCourses();
  }

  loadAssessments() {
    const user = this.authService.getUser();
    if (user?.userId) {
      this.assessmentService.getAssessmentsByInstructor(user.userId).subscribe({
        next: (assessments) => this.assessments = assessments,
        error: (error) => console.error('Error loading assessments:', error)
      });
    }
  }

  loadCourses() {
    const user = this.authService.getUser();
    if (user?.userId) {
      this.courseService.getCoursesByInstructor(user.userId).subscribe({
        next: (courses) => this.courses = courses,
        error: (error) => console.error('Error loading courses:', error)
      });
    }
  }

  saveAssessment() {
    const user = this.authService.getUser();
    if (!user?.userId) return;

    this.currentAssessment.instructorId = user.userId;
    this.currentAssessment.courseId = parseInt(this.currentAssessment.courseId.toString());

    if (this.editingAssessment) {
      this.assessmentService.updateAssessment(this.currentAssessment.id!, this.currentAssessment).subscribe({
        next: () => {
          this.loadAssessments();
          this.resetForm();
          alert('Assessment updated successfully!');
        },
        error: (error) => console.error('Error updating assessment:', error)
      });
    } else {
      this.assessmentService.createAssessment(this.currentAssessment).subscribe({
        next: () => {
          this.loadAssessments();
          this.resetForm();
          alert('Assessment created successfully!');
        },
        error: (error) => console.error('Error creating assessment:', error)
      });
    }
  }

  editAssessment(assessment: Assessment) {
    this.currentAssessment = { ...assessment };
    this.editingAssessment = true;
  }

  deleteAssessment(id: number) {
    if (confirm('Are you sure you want to delete this assessment?')) {
      this.assessmentService.deleteAssessment(id).subscribe({
        next: () => {
          this.loadAssessments();
          alert('Assessment deleted successfully!');
        },
        error: (error: any) => console.error('Error deleting assessment:', error)
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.currentAssessment = { title: '', description: '', courseId: 0, instructorId: 0, questions: '' };
    this.editingAssessment = false;
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown';
  }
}