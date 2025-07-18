import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currPage = 1;
  totalPages = 1;
  isLoading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.isLoading = true;
    this.userService.getUsers(page).subscribe({
      next: (res) => {
        this.users = res.data;
        this.currPage = res.page;
        this.totalPages = res.total_pages;
        this.isLoading = false;
      },
      error: (err) => {
        alert(`Lỗi khi loading danh sách người dùng:\n ${err}`);
        this.isLoading = false;
      },
    });
  }

  viewUser(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  editUser(id: number): void {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  deleteUser(id: number): void {
    if(confirm('Bạn có chắc chắn muốn xóa user này?')) {
      this.userService.deleteUser(id).subscribe({
        next: (res) => {
          alert(`Xóa thành công: ${res}`);
          this.loadUsers(this.currPage);
        },
        error: (err) => {
          alert(`Có lỗi khi xóa user: ${err}`);
        }
      });
    }
  }

  addUser(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }

  onPageChange(page: number): void {
    this.loadUsers(page);
  }
}
