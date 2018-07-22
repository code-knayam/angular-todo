import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { CoreComponent } from './core/core.component';
import { LandingComponent } from './core/landing/landing.component';
import { ProfileComponent } from './core/profile/profile.component';
import { TaskListComponent } from './core/task-list/task-list.component';
import { TasksService } from './core/tasks.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    HeaderComponent,
    NavigationComponent,
    CoreComponent,
    LandingComponent,
    ProfileComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
