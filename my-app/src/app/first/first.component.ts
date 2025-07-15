import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  formControlArr: FormArray;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formControlArr = new FormArray([
      new FormControl('name', Validators.required),
      new FormControl('email', [Validators.required, Validators.email]),
    ]);

    this.formGroup = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.email, Validators.required])
    });
  }

  ngOnInit(): void {}

  addPhone() {
    this.formControlArr.setValue([]);
    this.formControlArr.patchValue([]);

    this.formGroup.status
    this.formGroup.controls
  }
}
