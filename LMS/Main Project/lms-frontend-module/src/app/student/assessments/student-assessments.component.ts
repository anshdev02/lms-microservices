import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentService, Assessment, AssessmentSubmission } from '../../services/assessment.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Available Assessments</h2>
      
      <div *ngIf="!selectedAssessment" class="assessments-grid">
        <div *ngFor="let assessment of assessments" class="assessment-card">
          <h3>{{ assessment.title }}</h3>
          <p>{{ assessment.description }}</p>
          <button (click)="startAssessment(assessment)" class="btn-primary">Start Assessment</button>
        </div>
      </div>

      <div *ngIf="selectedAssessment && !showResults" class="assessment-form">
        <h3>{{ selectedAssessment.title }}</h3>
        <p>{{ selectedAssessment.description }}</p>
        
        <div class="question">
          <h4>Assessment Questions:</h4>
          <div class="question-text">{{ selectedAssessment.questions }}</div>
        </div>
        
        <div class="form-actions">
          <button (click)="submitAssessment()" class="btn-success">Mark as Completed</button>
          <button (click)="cancelAssessment()" class="btn-secondary">Cancel</button>
        </div>
      </div>

      <div *ngIf="showResults" class="results">
        <h3>Assessment Completed</h3>
        <p>You have successfully completed the assessment!</p>
        <button (click)="backToList()" class="btn-primary">Back to Assessments</button>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1000px; margin: 0 auto; }
    .assessments-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .assessment-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .assessment-card h3 { margin-top: 0; color: #333; }
    .question { margin-bottom: 25px; padding: 15px; background: #f9f9f9; border-radius: 5px; }
    .question h4 { margin-top: 0; color: #555; }
    .option { margin: 8px 0; }
    .option input { margin-right: 8px; }
    .form-actions { margin-top: 30px; }
    .btn-primary, .btn-success, .btn-secondary { padding: 10px 20px; margin-right: 10px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background: #007bff; color: white; }
    .btn-success { background: #28a745; color: white; }
    .btn-secondary { background: #6c757d; color: white; }
    .results { text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px; }
    .results h3 { color: #28a745; }
    .results p { font-size: 18px; margin: 20px 0; }
  `]
})
export class StudentAssessmentsComponent implements OnInit {
  assessments: Assessment[] = [];
  selectedAssessment: Assessment | null = null;
  questions: any[] = [];
  answers: number[] = [];
  showResults = false;
  score = 0;

  constructor(
    private assessmentService: AssessmentService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAssessments();
  }

  loadAssessments() {
    const user = this.authService.getUser();
    if (user?.userId) {
      this.enrollmentService.getEnrollmentsByStudent(user.userId).subscribe({
        next: (enrollments) => {
          const courseIds = enrollments.map(e => e.courseId);
          this.assessments = [];
          
          courseIds.forEach(courseId => {
            this.assessmentService.getAssessmentsByCourse(courseId).subscribe({
              next: (assessments) => {
                // Filter out completed assessments
                assessments.forEach(assessment => {
                  this.assessmentService.isAssessmentCompleted(assessment.id!, user.userId!).subscribe({
                    next: (isCompleted) => {
                      if (!isCompleted) {
                        this.assessments.push(assessment);
                      }
                    },
                    error: (error) => {
                      // If error checking completion, show the assessment
                      this.assessments.push(assessment);
                    }
                  });
                });
              },
              error: (error) => console.error('Error loading assessments:', error)
            });
          });
        },
        error: (error) => console.error('Error loading enrollments:', error)
      });
    }
  }

  startAssessment(assessment: Assessment) {
    this.selectedAssessment = assessment;
    // For text-based questions, just display the text
    this.questions = [{ question: assessment.questions, options: [], correct: -1 }];
    this.answers = [];
  }

  submitAssessment() {
    const user = this.authService.getUser();
    if (user?.userId && this.selectedAssessment?.id) {
      const submission: AssessmentSubmission = {
        assessmentId: this.selectedAssessment.id,
        studentId: user.userId
      };
      
      this.assessmentService.submitAssessment(submission).subscribe({
        next: () => {
          this.showResults = true;
        },
        error: (error) => {
          console.error('Error submitting assessment:', error);
          this.showResults = true; // Show results anyway
        }
      });
    } else {
      this.showResults = true;
    }
  }

  cancelAssessment() {
    this.selectedAssessment = null;
    this.questions = [];
    this.answers = [];
    this.showResults = false;
  }

  backToList() {
    this.selectedAssessment = null;
    this.questions = [];
    this.answers = [];
    this.showResults = false;
    this.score = 0;
    // Reload assessments to remove completed ones
    this.loadAssessments();
  }
}