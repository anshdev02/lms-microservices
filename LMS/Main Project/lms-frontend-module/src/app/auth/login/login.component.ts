import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginMode = true;
  username = '';
  password = '';
  role = 'STUDENT';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: User) => {
        this.authService.saveUser(res);

        if (res.role === 'ADMIN') this.router.navigate(['/admin/dashboard']);
        else if (res.role === 'INSTRUCTOR') this.router.navigate(['/instructor/dashboard']);
        else this.router.navigate(['/student/dashboard']);
      },
      error: () => this.error = 'Invalid credentials'
    });
  }

  register() {
    this.authService.register(this.username, this.password, this.role).subscribe({
      next: (res: any) => {
        // Create user object from registration response
        const user = { 
          userId: res.userId, 
          username: this.username, 
          role: res.role 
        };
        this.authService.saveUser(user);
        
        if (user.role === 'ADMIN') this.router.navigate(['/admin/dashboard']);
        else if (user.role === 'INSTRUCTOR') this.router.navigate(['/instructor/dashboard']);
        else this.router.navigate(['/student/dashboard']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.error = 'Registration failed';
      }
    });
  }
}
