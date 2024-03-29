import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User, UsersData } from '../../../types';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, PaginatorModule, CardModule, AvatarModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  per_page: number = 0;
  page: number = 1;
  total_users: number = 0;
  total_pages: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.page).subscribe((data: UsersData) => {
      this.users = data.data;
      this.page = data.page;
      this.total_users = data.total;
      this.total_pages = data.total_pages;
      this.per_page = data.per_page;
    });
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.loadUsers();
  }
}
