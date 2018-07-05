import { Routes, RouterModule  } from './../../node_modules/@angular/router';
import { LandingComponent } from './core/landing/landing.component';
import { NgModule } from '../../node_modules/@angular/core';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { ProfileComponent } from './core/profile/profile.component';
import { TaskListComponent } from './core/task-list/task-list.component';


const appRoutes: Routes = [
  {path: '', component: LandingComponent},
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
