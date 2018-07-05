import { Routes, RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';

import { LandingComponent } from './core/landing/landing.component';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { ProfileComponent } from './core/profile/profile.component';
import { TaskListComponent } from './core/task-list/task-list.component';


const appRoutes: Routes = [
  {path: 'overview', component: LandingComponent},
  {path: 'addTask', component: AddTaskComponent},
  {path: 'taskList', component: TaskListComponent},
  {path: 'profile', component: ProfileComponent}
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
