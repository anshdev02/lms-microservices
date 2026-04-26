import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './student/student.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
    InstructorModule,
    StudentModule,
    SharedModule,
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
