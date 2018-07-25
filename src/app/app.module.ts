import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreComponent } from './core/core.component';
import { MenuComponent } from './core/menu/menu.component';
import { AddTaskComponent } from './core/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    MenuComponent,
    AddTaskComponent  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
