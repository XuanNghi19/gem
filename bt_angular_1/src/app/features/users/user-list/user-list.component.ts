import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currPage = 1;
  totalPages = 1;
  fixId: any = null;
  fixEmail: any;
  fixFirstName: any;
  fixLastName: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.fixEmail = params.get('email');
      this.fixFirstName = params.get('first_name');
      this.fixLastName = params.get('last_name');
      this.fixId = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.loadingService.show();
    this.cdr.detectChanges();

    this.userService.getUsers(page).subscribe({
      next: (res) => {
        this.users = res.data;
        if (!!this.fixId) {
          const index = this.users.findIndex((user) => user.id === this.fixId);
          if (index !== -1) {
            this.users[index].email = this.fixEmail;
            this.users[index].first_name = this.fixFirstName;
            this.users[index].last_name = this.fixLastName;
          } else {
            this.users.push({
              id: Date.now() + Math.floor(Math.random() * 1000),
              email: this.fixEmail,
              first_name: this.fixFirstName,
              last_name: this.fixLastName

            });
          }

          this.fixId = null;
        }
        this.currPage = res.page;
        this.totalPages = res.total_pages;
      },
      error: (err) => {
        alert(`Lỗi khi loading danh sách người dùng:\n ${err}`);
      },
      complete: () => this.loadingService.hide()
    });
  }

  viewUser(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  editUser(id: number): void {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  deleteUser(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      this.userService.deleteUser(id).subscribe({
        next: (res) => {
          alert(`Xóa thành công: ${res}`);
          this.loadUsers(this.currPage);
        },
        error: (err) => {
          alert(`Có lỗi khi xóa user: ${err}`);
        },
      });
    }
  }

  addUser(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }

  onPageChange(page: number): void {
    this.loadUsers(page);
  }
}
