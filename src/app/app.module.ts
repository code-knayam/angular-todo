import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { CoreComponent } from './core/core.component';
import { LandingComponent } from './core/landing/landing.component';
import { ProfileComponent } from './core/profile/profile.component';
import { TaskListComponent } from './core/task-list/task-list.component';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }