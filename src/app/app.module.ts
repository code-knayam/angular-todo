import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './menu/header/header.component';
import { NavigationComponent } from './menu/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    MenuComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
