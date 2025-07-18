import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { OverlayLoadingComponent } from './loading/overlay-loading/overlay-loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [DynamicFormComponent, OverlayLoadingComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [DynamicFormComponent, OverlayLoadingComponent],
})
export class ComponentsModule {}
