import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralInfoComponent,
    HomeComponent,
    InvoicesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
