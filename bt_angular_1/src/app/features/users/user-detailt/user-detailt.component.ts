import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detailt',
  templateUrl: './user-detailt.component.html',
  styleUrls: ['./user-detailt.component.scss'],
})
export class UserDetailtComponent implements OnInit {
  user?: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadingService.show();

    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
      complete: () => this.loadingService.hide()
    });
  }

  editUser(): void {
    this.router.navigate(['/users', this.user?.id, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
