import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DetailComponent } from './detail/detail.component';
import { InfoComponent } from './info/info.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'detail', component: DetailComponent },
  { path: 'info', component: InfoComponent },
];

@NgModule({
  declarations: [
    AdminComponent,
    DetailComponent,
    InfoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
