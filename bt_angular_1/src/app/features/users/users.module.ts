import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailtComponent } from './user-detailt/user-detailt.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'new', component: UserFormComponent },
      { path: ':id', component: UserDetailtComponent },
      { path: ':id/edit', component: UserFormComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailtComponent,
    UserFormComponent,
    UserLayoutComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule],
})
export class UsersModule {}
