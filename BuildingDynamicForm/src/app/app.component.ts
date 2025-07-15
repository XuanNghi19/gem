import { Component, OnInit } from '@angular/core';
import { FormField } from './types/FormConfiguration.model';
import { DynamicFormService } from './services/formServices/dynamic-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "Building Dynamic Form";
  formFields: FormField[] = [];
  submittedData: any = null;

  constructor(private dynamicFormService: DynamicFormService) {}
  ngOnInit(): void {
    this.formFields = this.dynamicFormService.getFormConfig();
  }

  onFormSubmit(formData: any): void {
    console.log('Form submitted: ', formData);
    this.submittedData = formData;
  }

}
