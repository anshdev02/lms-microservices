import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showProfile = false;

  constructor(public authService: AuthService) {}

  get username(): string {
    const user = this.authService.getUser();
    return user?.username || '';
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  getStudentInfo() {
    const user = this.authService.getUser();
    return {
      id: user?.userId || 'N/A',
      username: user?.username || 'N/A',
      role: user?.role || 'N/A'
    };
  }

  logout() {
    this.authService.logout();
  }
}
