import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { FormField } from 'src/app/core/models/form-configuration.model';
import { DynamicFormService } from 'src/app/core/services/dynamic-form.service';
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
  isLoading = false;
  isSubmitting = false;

  constructor(
    private dynamicFormService: DynamicFormService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkMode();
    this.formFields = this.dynamicFormService.getFormUser(this.formData);
  }

  private checkMode(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  private loadUser(): void {
    this.isLoading = true;
    this.userService
      .getUser(this.userId!)
      .pipe(
        tap(
          () =>
            (this.formFields = this.dynamicFormService.getFormUser(
              this.formData
            ))
        )
      )
      .subscribe({
        next: (response) => {
          this.formData = response.data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.isLoading = false;
        },
      });
  }

  onSubmit(submitData: any): void {
    this.isSubmitting = true;
    this.formData = submitData;

    const operation = this.isEditMode
      ? this.userService.updateUser(this.userId!, this.formData)
      : this.userService.createUser(this.formData);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/users']);
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
