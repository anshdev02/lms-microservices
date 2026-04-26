import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardComponent } from './dashboard/student-dashboard.component';
import { CourseCatalogComponent } from './course-catalog/course-catalog.component';
import { MyEnrollmentsComponent } from './enrollments/my-enrollments.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentDashboardComponent,
    CourseCatalogComponent,
    MyEnrollmentsComponent
  ]
})
export class StudentModule {}
