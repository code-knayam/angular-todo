import { Routes, RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core/core.component';
import { AuthComponent } from './auth/auth.component';
import { CreateListComponent } from './core/create-list/create-list.component';

const appRoutes: Routes = [
  {
    path: '', component: CoreComponent, children: [
    {path: 'createList', component: CreateListComponent}
  ] },
  {path: 'auth', component: AuthComponent },
  {path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
