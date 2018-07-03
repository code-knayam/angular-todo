import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UpperMenuComponent } from './upper-menu/upper-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    UpperMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
