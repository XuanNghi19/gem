import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/auth.model';
import { FormField } from 'src/app/core/models/form-configuration.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { DynamicFormService } from 'src/app/core/services/dynamic-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formFields: FormField[] = [];
  loginRequest: any = null;
  isLoading = false;

  constructor(
    private dynamicFormService: DynamicFormService,
    private router: Router,
    private athService: AuthService
  ) {
    console.log('LoginComponent constructor called');
  }

  ngOnInit(): void {
    this.formFields = this.dynamicFormService.getFormLogin();
  }

  onSubmit(loginRequest: LoginRequest): void {
    this.loginRequest = loginRequest;
    this.isLoading = true;

    this.athService.login(this.loginRequest).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        alert(`Đăng nhập thất bại!\nLỗi: ${err}`);
        this.isLoading = false;
      }
    });
  }
}
