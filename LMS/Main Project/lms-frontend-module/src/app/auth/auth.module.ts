import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MyEnrollmentsComponent } from '../student/enrollments/my-enrollments.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    LoginComponent
  ]
})
export class AuthModule {}
