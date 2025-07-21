import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../models/form-configuration.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor() {}

  createFormGroup(fields: FormField[]): FormGroup {
    const group: any = [];

    fields.forEach((field) => {
      // tao validators
      const validators = this.createValidators(field);

      // tao formControl
      group[field.key] = new FormControl(
        {
          value: field.value,
          disabled: false,
        },
        validators
      );
    });

    return new FormGroup(group);
  }

  // tao validators cho field
  private createValidators(field: FormField) {
    const validators = [];

    if (field.required) validators.push(Validators.required);

    if (field.type === 'email') validators.push(Validators.email);

    if (field.type === 'number') validators.push(Validators.pattern('/^d+$/'));

    // them custom validators neu co
    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  // du lieu form mau
  getFormConfig(): FormField[] {
    return [
      {
        key: 'firstName',
        label: 'Tên',
        type: 'text',
        required: true,
        placeholder: 'Nhập tên của bạn',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'example@email.com',
        order: 2,
      },
      // {
      //   key: 'age',
      //   label: 'Tuổi',
      //   type: 'number',
      //   required: false,
      //   placeholder: '25',
      //   order: 3,
      // },
      // {
      //   key: 'city',
      //   label: 'Thành phố',
      //   type: 'select',
      //   required: true,
      //   options: [
      //     { key: 'hanoi', value: 'Hà Nội' },
      //     { key: 'hcm', value: 'TP. Hồ Chí Minh' },
      //     { key: 'danang', value: 'Đà Nẵng' },
      //   ],
      //   order: 4,
      // },
      // {
      //   key: 'subscribe',
      //   label: 'Đăng ký nhận tin',
      //   type: 'checkbox',
      //   value: false,
      //   order: 5,
      // },
      // {
      //   key: 'params',
      //   label: 'Thông tin mô tả',
      //   type: 'textarea',
      //   value: '',
      //   required: true,
      //   order: 6,
      // },
    ];
  }

  getFormLogin(): FormField[] {
    return [
      {
        key: 'email',
        label: '',
        type: 'email',
        required: true,
        placeholder: 'Vui lòng nhập email',
        order: 1,
      },
      {
        key: 'password',
        label: '',
        type: 'password',
        required: true,
        placeholder: 'Vui lòng nhập mật khẩu',
        order: 2,
      },
    ];
  }

  getFormUser(): FormField[] {
    return [
      {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Vui lòng nhập email',
        order: 1,
      },
      {
        key: 'first_name',
        label: 'Tên',
        type: 'text',
        required: true,
        placeholder: 'Vui lòng nhập tên',
        order: 2,
      },
      {
        key: 'last_name',
        label: 'Họ',
        type: 'text',
        required: true,
        placeholder: 'Vui lòng nhập họ',
        order: 3,
      },
    ];
  }
}
