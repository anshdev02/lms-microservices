import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { StudentDashboardComponent } from './student/dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './instructor/dashboard/instructor-dashboard.component';
import { CourseDetailsComponent } from './instructor/course-details/course-details.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './admin/users/manage-users.component';
import { ManageCoursesComponent } from './admin/courses/manage-courses.component';
import { InstructorAssessmentsComponent } from './instructor/assessments/instructor-assessments.component';
import { StudentAssessmentsComponent } from './student/assessments/student-assessments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'student/course-details/:id', component: CourseDetailsComponent },
  { path: 'student/assessments', component: StudentAssessmentsComponent },
  { path: 'instructor/dashboard', component: InstructorDashboardComponent },
  { path: 'instructor/course-details/:id', component: CourseDetailsComponent },
  { path: 'instructor/assessments', component: InstructorAssessmentsComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/users', component: ManageUsersComponent },
  { path: 'admin/courses', component: ManageCoursesComponent }
];

