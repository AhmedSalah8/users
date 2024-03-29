import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { User } from '../../../types';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() searchChange = new EventEmitter<number>();
  searchTerm: string = '';
  filteredUsers: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  search(): void {
    this.searchChange.emit(+this.searchTerm);
  }

  filterUsers(event: any): void {
    const query = event.query;
    this.userService.getUserById(query).subscribe(
      (users) => {
        this.filteredUsers = [users.data];
      },
      (error) => {
        if (error.status === 404) {
          this.errorMessage = 'User not found';
          this.filteredUsers = [];
        } else {
          this.errorMessage = 'An error occurred';
          this.filteredUsers = [];
        }
      }
    );
  }

  onUserSelect(event: AutoCompleteSelectEvent): void {
    const selectedUser: User = event.value;
    this.searchChange.emit(selectedUser.id);
  }
}
