import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { Course, User } from '../../models/models';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Manage Courses</h2>
      
      <!-- Add Course Form -->
      <div class="add-course-form">
        <h3>{{ editingCourse ? 'Edit Course' : 'Add New Course' }}</h3>
        <form (ngSubmit)="saveCourse()" #courseForm="ngForm">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" [(ngModel)]="currentCourse.title" name="title" required>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea [(ngModel)]="currentCourse.description" name="description" required rows="4"></textarea>
          </div>
          <div class="form-group">
            <label>Duration:</label>
            <input type="text" [(ngModel)]="currentCourse.duration" name="duration" placeholder="e.g., 8 weeks, 3 months" required>
          </div>
          <div class="form-group">
            <label>Course Content:</label>
            <textarea [(ngModel)]="currentCourse.content" name="content" placeholder="Add course materials: images URLs, video links, notes, etc." rows="6"></textarea>
          </div>
          <div class="form-group">
            <label>Instructor:</label>
            <select [(ngModel)]="currentCourse.instructorId" name="instructorId" required>
              <option value="">Select Instructor</option>
              <option *ngFor="let instructor of instructors" [value]="instructor.id">{{ instructor.username }} (ID: {{ instructor.id }})</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="!courseForm.form.valid">{{ editingCourse ? 'Update' : 'Add' }} Course</button>
            <button type="button" (click)="cancelEdit()" *ngIf="editingCourse">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Courses List -->
      <div class="courses-list">
        <h3>Courses List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Content</th>
              <th>Instructor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let course of courses">
              <td>{{ course.id }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.description }}</td>
              <td>{{ course.duration }}</td>
              <td>{{ course.content ? (course.content.length > 50 ? course.content.substring(0, 50) + '...' : course.content) : 'No content' }}</td>
              <td>{{ getInstructorName(course.instructorId) }}</td>
              <td>
                <button (click)="editCourse(course)">Edit</button>
                <button (click)="deleteCourse(course.id!)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="courses.length === 0" class="no-courses">
          No courses found.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .add-course-form {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      max-width: 400px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .form-group textarea {
      resize: vertical;
    }
    
    .form-actions {
      margin-top: 20px;
    }
    
    .form-actions button {
      padding: 10px 20px;
      margin-right: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .form-actions button[type="submit"] {
      background: #007bff;
      color: white;
    }
    
    .form-actions button[type="button"] {
      background: #6c757d;
      color: white;
    }
    
    .courses-list table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .courses-list th, .courses-list td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .courses-list th {
      background: #f8f9fa;
      font-weight: bold;
    }
    
    .courses-list td:nth-child(3) {
      max-width: 300px;
      word-wrap: break-word;
    }
    
    .courses-list button {
      padding: 5px 10px;
      margin-right: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
    
    .courses-list button:first-child {
      background: #28a745;
      color: white;
    }
    
    .delete-btn {
      background: #dc3545 !important;
      color: white !important;
    }
    
    .no-courses {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `]
})
export class ManageCoursesComponent implements OnInit {
  courses: Course[] = [];
  instructors: User[] = [];
  currentCourse: Course = { title: '', description: '', instructorId: 0, duration: '', content: '' };
  editingCourse = false;

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadCourses();
    this.loadInstructors();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: (error) => {
        console.error('Error loading courses:', error);
        if (error.message && error.message.includes('not working')) {
          alert(error.message);
        } else {
          alert('Error loading courses. Please try again.');
        }
      }
    });
  }

  loadInstructors() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.instructors = users.filter(user => user.role === 'INSTRUCTOR'),
      error: (error) => {
        console.error('Error loading instructors:', error);
        if (error.message && error.message.includes('not working')) {
          alert(error.message);
        } else {
          alert('Error loading instructors. Please try again.');
        }
      }
    });
  }

  saveCourse() {
    if (this.editingCourse) {
      // Convert instructorId to number and ensure content is not undefined
      const courseData = {
        ...this.currentCourse,
        instructorId: parseInt(this.currentCourse.instructorId.toString()),
        content: this.currentCourse.content || ''
      };
      console.log('Updating course data:', courseData);
      this.courseService.updateCourse(this.currentCourse.id!, courseData).subscribe({
        next: () => {
          this.loadCourses();
          this.resetForm();
          alert('Course updated successfully!');
        },
        error: (error) => {
          console.error('Error updating course:', error);
          if (error.message && error.message.includes('not working')) {
            alert(error.message);
          } else {
            alert('Error updating course. Please try again.');
          }
        }
      });
    } else {
      // Validate required fields
      if (!this.currentCourse.title || !this.currentCourse.description || !this.currentCourse.duration || !this.currentCourse.instructorId) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Convert instructorId to number and ensure content is not undefined
      const courseData = {
        title: this.currentCourse.title,
        description: this.currentCourse.description,
        duration: this.currentCourse.duration,
        instructorId: parseInt(this.currentCourse.instructorId.toString()),
        content: this.currentCourse.content || ''
      };
      console.log('Creating course data:', courseData);
      this.courseService.createCourse(courseData).subscribe({
        next: () => {
          this.loadCourses();
          this.resetForm();
          alert('Course added successfully!');
        },
        error: (error) => {
          console.error('Error creating course:', error);
          if (error.message && error.message.includes('not working')) {
            alert(error.message);
          } else {
            alert('Error creating course. Please check all fields.');
          }
        }
      });
    }
  }

  editCourse(course: Course) {
    this.currentCourse = { ...course };
    this.editingCourse = true;
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: (response) => {
          console.log('Delete response:', response);
          this.loadCourses();
          alert('Course deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          if (error.message && error.message.includes('not working')) {
            alert(error.message);
          } else {
            alert('Error deleting course.');
          }
        }
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.currentCourse = { title: '', description: '', instructorId: 0, duration: '', content: '' };
    this.editingCourse = false;
  }

  getInstructorName(instructorId: number): string {
    const instructor = this.instructors.find(inst => inst.id === instructorId);
    return instructor ? instructor.username : 'Unknown';
  }
}