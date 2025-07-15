import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormField } from '../types/FormConfiguration.model';
import { DynamicFormService } from '../services/formServices/dynamic-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() submitText: string = 'Send';
  @Input() isForm: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.dynamicFormService.createFormGroup(this.fields);
  }

  onSubmit(): void {
    if(this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  markAllFieldsAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }

  // kiem tra field co loi khong
  hasError(fieldKey: string): boolean {
    const field = this.form.get(fieldKey);
    return field ? field.invalid && field.touched : false;
  }

  // lay thong bao loi
  getErrorMessage(fieldKey: string): string {
    const field = this.form.get(fieldKey);
    if(field?.errors) {
      if(field.errors['required']) 
        return 'Trường này là bắt buộc';
      if(field.errors['email'])
        return 'Email không hợp lệ';
      if(field.errors['pattern']) return 'Định dạng không đúng';
    }

    return '';
  }

  get sortedFields(): FormField[] {
    return this.fields.sort((a, b) => (a.order || 0)  - (b.order || 0));
  }
}
