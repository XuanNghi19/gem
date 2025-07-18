import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detailt',
  templateUrl: './user-detailt.component.html',
  styleUrls: ['./user-detailt.component.scss'],
})
export class UserDetailtComponent implements OnInit {
  user?: User;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;

    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoading = false;
      },
    });
  }

  editUser(): void {
    this.router.navigate(['/users', this.user?.id, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
