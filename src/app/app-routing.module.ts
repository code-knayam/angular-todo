import { Routes, RouterModule  } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core/core.component';



// const appRoutes: Routes = [
//   {path: 'overview', component: LandingComponent},
//   {path: 'addTask', component: AddTaskComponent},
//   {path: 'taskList', component: TaskListComponent},
//   {path: 'profile', component: ProfileComponent}
// ];

const appRoutes: Routes = [
  {path: '', component: CoreComponent }
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
