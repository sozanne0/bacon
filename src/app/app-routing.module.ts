import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { VendorsComponent } from './vendors/vendors.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { VendorReportComponent } from './vendor-report/vendor-report.component';
import { ReceiptReportComponent } from './receipt-report/receipt-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoices/:id', component: InvoiceDetailComponent },
  { path: 'items/:id', component: ItemDetailComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'vendors/:id', component: VendorDetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'vendorSalesReport', component: VendorReportComponent },
  { path: 'receiptReport', component: ReceiptReportComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
