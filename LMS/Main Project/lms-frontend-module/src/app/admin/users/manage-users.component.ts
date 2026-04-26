import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Manage Users</h2>
      
      <!-- Add User Form -->
      <div class="add-user-form">
        <h3>{{ editingUser ? 'Edit User' : 'Add New User' }}</h3>
        <form (ngSubmit)="saveUser()" #userForm="ngForm">
          <div class="form-group">
            <label>Username:</label>
            <input type="text" [(ngModel)]="currentUser.username" name="username" required>
          </div>
          <div class="form-group">
            <label>Role:</label>
            <select [(ngModel)]="currentUser.role" name="role" required>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div class="form-group" *ngIf="!editingUser">
            <label>Password:</label>
            <input type="password" [(ngModel)]="currentUser.password" name="password" required>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="!userForm.form.valid">{{ editingUser ? 'Update' : 'Add' }} User</button>
            <button type="button" (click)="cancelEdit()" *ngIf="editingUser">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Users List -->
      <div class="users-list">
        <h3>Users List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button (click)="editUser(user)">Edit</button>
                <button (click)="deleteUser(user.id!)" class="delete-btn">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="users.length === 0" class="no-users">
          No users found.
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
    
    .add-user-form {
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
    
    .form-group input, .form-group select {
      width: 100%;
      max-width: 300px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
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
    
    .users-list table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .users-list th, .users-list td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .users-list th {
      background: #f8f9fa;
      font-weight: bold;
    }
    
    .users-list button {
      padding: 5px 10px;
      margin-right: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
    
    .users-list button:first-child {
      background: #28a745;
      color: white;
    }
    
    .delete-btn {
      background: #dc3545 !important;
      color: white !important;
    }
    
    .no-users {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `]
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User = { username: '', role: 'STUDENT' };
  editingUser = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error('Error loading users:', error)
    });
  }

  saveUser() {
    if (this.editingUser) {
      this.userService.updateUser(this.currentUser.id!, this.currentUser).subscribe({
        next: () => {
          this.loadUsers();
          this.resetForm();
        },
        error: (error) => console.error('Error updating user:', error)
      });
    } else {
      this.userService.createUser(this.currentUser).subscribe({
        next: () => {
          alert('User added successfully!');
          this.loadUsers();
          this.resetForm();
        },
        error: (error) => console.error('Error creating user:', error)
      });
    }
  }

  editUser(user: User) {
    this.currentUser = { ...user };
    this.editingUser = true;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error) => console.error('Error deleting user:', error)
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.currentUser = { username: '', role: 'STUDENT' };
    this.editingUser = false;
  }
}