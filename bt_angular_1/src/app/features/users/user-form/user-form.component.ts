import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { FormField } from 'src/app/core/models/form-configuration.model';
import { DynamicFormService } from 'src/app/core/services/dynamic-form.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  formFields: FormField[] = [];
  formData: any = null;
  isEditMode = false;
  userId?: number;
  isSubmitting = false;

  constructor(
    private dynamicFormService: DynamicFormService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formFields = this.dynamicFormService.getFormUser();
    this.checkMode();
  }
  private checkMode(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  private loadUser(): void {
    this.loadingService.show();
    this.cdr.detectChanges();

    this.userService.getUser(this.userId!).subscribe({
      next: (response) => {
        this.formData = response.data;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      },
      complete: () => this.loadingService.hide(),
    });
  }

  onSubmit(submitData: any): void {
    this.isSubmitting = true;
    this.formData = submitData;

    const operation$ = this.isEditMode
      ? this.userService.updateUser(this.userId!, this.formData)
      : this.userService.createUser(this.formData);

    operation$.subscribe({
      next: (res) => {
        console.log(res);
        if (this.isEditMode) alert('Sửa người dùng thành công!');
        else alert('Thêm người dùng thành công!');
        this.router.navigate(['/users'], {
          queryParams: {
            email: res.email,
            first_name: res.first_name,
            last_name: res.last_name,
            id: this.userId,
          },
        });
      },
      error: (error) => {
        console.error('Lỗi không lưu được người dùng: ', error);
        this.isSubmitting = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
