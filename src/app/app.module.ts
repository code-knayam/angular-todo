import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreComponent } from './core/core.component';
import { MenuComponent } from './core/menu/menu.component';
import { AddTaskComponent } from './core/add-task/add-task.component';
import { TaskListComponent } from './core/task-list/task-list.component';
import { TaskService } from './core/task.service';
import { TaskListItemComponent } from './core/task-list/task-list-item/task-list-item.component';
import { SharedService } from './core/shared.service';
import { MenuContainerComponent } from './core/menu/menu-container/menu-container.component';
import { TaskMenuContainerComponent } from './core/menu/task-menu-container/task-menu-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    MenuComponent,
    AddTaskComponent,
    TaskListComponent,
    TaskListItemComponent,
    MenuContainerComponent,
    TaskMenuContainerComponent ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TaskService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
