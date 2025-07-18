import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailtComponent } from './user-detailt/user-detailt.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from "src/app/shared/components/components.module";



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailtComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: UserListComponent },
        { path: 'new', component: UserFormComponent },
        { path: ':id', component: UserDetailtComponent },
        { path: ':id/edit', component: UserFormComponent }
    ]),
    ComponentsModule
]
})
export class UsersModule { }
