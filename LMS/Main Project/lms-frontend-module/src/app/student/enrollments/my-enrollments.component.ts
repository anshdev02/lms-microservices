import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../services/auth.service';
import { Enrollment } from '../../models/models';

@Component({
  selector: 'app-my-enrollments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-enrollments.component.html',
  styleUrls: ['./my-enrollments.component.css']
})
export class MyEnrollmentsComponent implements OnInit {

  enrollments: Enrollment[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user && user.userId) {
      this.enrollmentService
        .getEnrollmentsByStudent(user.userId)
        .subscribe((data: Enrollment[]) => this.enrollments = data);
    }
  }
}
