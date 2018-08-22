import { Routes, RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core/core.component';
import { AuthComponent } from './auth/auth.component';
import { CreateListComponent } from './core/create-list/create-list.component';
import { EditListComponent } from './core/edit-list/edit-list.component';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { EditTaskComponent } from './core/edit-task/edit-task.component';

const appRoutes: Routes = [
  {
    path: '', component: CoreComponent, children: [
    {path: 'addTask', component: AddTaskComponent},
    {path: 'editTask', component: EditTaskComponent},
    {path: 'createList', component: CreateListComponent},
    {path: 'renameList', component: EditListComponent}
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
