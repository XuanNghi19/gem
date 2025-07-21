import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/core/models/form-configuration.model';
import { DynamicFormService } from 'src/app/core/services/dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() fields: FormField[] = [];
  @Input() fieldData: any[] = [];
  @Input() submitText: string = 'Send';
  @Input() isForm: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});

  constructor(private dynamicFormService: DynamicFormService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['fieldData']) {
      this.form.patchValue(changes['fieldData'].currentValue);

    }
  }

  ngOnInit(): void {
    this.form = this.dynamicFormService.createFormGroup(this.fields);
  }



  onSubmit(): void {
    if (this.form.invalid) return this.form.markAllAsTouched();
    this.formSubmit.emit(this.form.value);
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
