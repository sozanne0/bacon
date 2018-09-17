import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AppRoutingModule } from './/app-routing.module';
import { VendorsComponent } from './vendors/vendors.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { DateTimeComponent } from './date-time.component';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralInfoComponent,
    HomeComponent,
    InvoicesComponent,
    VendorsComponent,
    InvoiceDetailComponent,
    VendorDetailComponent,
    ItemDetailComponent,
    ReportsComponent,
    DateTimeComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
