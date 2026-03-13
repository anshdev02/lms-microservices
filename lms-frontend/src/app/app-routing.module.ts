import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { CourseListComponent } from './course/course_list/course-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'courses', component: CourseListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}