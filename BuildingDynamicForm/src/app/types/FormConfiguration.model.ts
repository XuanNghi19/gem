export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea' | 'password';
  value?: any;
  required?: any;
  placeholder?: string;
  options?: { key: string, value: string }[]; // cho select dropdown
  validators?: any[];
  order?: number;
}

export interface FormConfig {
  fields: FormField[];
  submitText?: string;
  title?: string;
}