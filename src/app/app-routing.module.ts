import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { VendorsComponent } from './vendors/vendors.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoice/:id', component: InvoiceDetailComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'vendor/:id', component: VendorDetailComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
