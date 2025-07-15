import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { InstandComponent } from './instand/instand.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: 'instand/:id/:name', component: InstandComponent },
  {
    path: 'instand',
    component: InstandComponent,
    children: [
      { path: 'first', component: FirstComponent },
      { path: 'second', component: SecondComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
