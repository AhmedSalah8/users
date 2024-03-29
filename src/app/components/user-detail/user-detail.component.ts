import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../../types';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data.data;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
