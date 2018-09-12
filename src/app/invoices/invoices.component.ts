import { Component, OnInit } from '@angular/core';

import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[];

  constructor(private invoiceService: InvoiceService) { }

  getInvoices(): void {
    this.invoices = this.invoiceService.getInvoices();
  }

  ngOnInit() {
    this.getInvoices();
  }

}
