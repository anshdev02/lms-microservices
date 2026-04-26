import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course, User } from '../../models/models';

@Component({
  selector: 'app-instructor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})

export class InstructorDashboardComponent implements OnInit {

  courses: Course[] = [];
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  students: User[] = [];
  enrolledStudents: any[] = [];
  selectedCourseForView: string = '';
  selectedCourseForBulk: string = '';
  selectedStudentIds: number[] = [];
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    if (user && user.userId) {
      this.courseService
        .getCoursesByInstructor(user.userId)
        .subscribe({
          next: (data: Course[]) => this.courses = data,
          error: (error) => {
            console.error('Error loading instructor courses:', error);
            this.courses = []; // Set empty array instead of showing alert
          }
        });
    }

    this.loadAllCourses();
    this.loadStudents();
  }

  filterCourses() {
    if (!this.searchTerm) {
      this.filteredCourses = this.allCourses;
    } else {
      this.filteredCourses = this.allCourses.filter(course => 
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnChanges() {
    this.filterCourses();
  }

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.allCourses = courses;
        this.filterCourses();
      },
      error: (error) => console.error('Error loading courses:', error)
    });
  }

  loadStudents() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.students = users.filter(user => user.role === 'STUDENT'),
      error: (error) => console.error('Error loading students:', error)
    });
  }

  viewEnrolledStudents() {
    if (this.selectedCourseForView) {
      const courseId = parseInt(this.selectedCourseForView);
      this.enrollmentService.getEnrollmentsByCourse(courseId).subscribe({
        next: (enrollments: any[]) => {
          this.enrolledStudents = enrollments.map((enrollment: any) => {
            const student = this.students.find(s => s.id === enrollment.studentId);
            const course = this.allCourses.find(c => c.id === enrollment.courseId);
            return {
              ...enrollment,
              studentName: student?.username || 'Unknown',
              courseName: course?.title || 'Unknown'
            };
          });
        },
        error: (error: any) => console.error('Error loading enrolled students:', error)
      });
    }
  }

  onStudentSelectionChange(studentId: number, event: any) {
    if (event.target.checked) {
      this.selectedStudentIds.push(studentId);
    } else {
      this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== studentId);
    }
  }

  assignCourseToMultipleStudents() {
    if (this.selectedCourseForBulk && this.selectedStudentIds.length > 0) {
      const courseId = parseInt(this.selectedCourseForBulk);
      let successCount = 0;
      let errorCount = 0;
      let duplicateCount = 0;
      
      this.selectedStudentIds.forEach(studentId => {
        this.enrollmentService.enroll(studentId, courseId).subscribe({
          next: () => {
            successCount++;
            if (successCount + errorCount + duplicateCount === this.selectedStudentIds.length) {
              this.showBulkAssignmentResult(successCount, errorCount, duplicateCount);
            }
          },
          error: (error: any) => {
            // Check if it's a duplicate enrollment error
            if (error.status === 500) {
              duplicateCount++;
              const studentName = this.students.find(s => s.id === studentId)?.username || 'Student';
              alert(`${studentName} is already assigned to this course!`);
            } else {
              errorCount++;
            }
            console.error('Error assigning course to student:', studentId, error);
            if (successCount + errorCount + duplicateCount === this.selectedStudentIds.length) {
              this.showBulkAssignmentResult(successCount, errorCount, duplicateCount);
            }
          }
        });
      });
    } else {
      alert('Please select a course and at least one student.');
    }
  }

  showBulkAssignmentResult(successCount: number, errorCount: number, duplicateCount: number) {
    let message = `Bulk assignment completed!\nSuccess: ${successCount}`;
    if (duplicateCount > 0) {
      message += `\nAlready enrolled: ${duplicateCount}`;
    }
    if (errorCount > 0) {
      message += `\nErrors: ${errorCount}`;
    }
    alert(message);
    this.selectedCourseForBulk = '';
    this.selectedStudentIds = [];
    this.uncheckAllStudents();
  }

  uncheckAllStudents() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="studentCheckbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="studentCheckbox"]') as NodeListOf<HTMLInputElement>;
    
    checkboxes.forEach(checkbox => checkbox.checked = isChecked);
    
    if (isChecked) {
      this.selectedStudentIds = this.students.map(student => student.id!).filter(id => id !== undefined);
    } else {
      this.selectedStudentIds = [];
    }
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/instructor/course-details', courseId]);
  }
}
