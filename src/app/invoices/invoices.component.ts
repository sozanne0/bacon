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
    this.invoiceService.getInvoices()
          .subscribe(invoices => this.invoices = invoices);
  }

  add(): void {
    this.invoiceService.addInvoice({ customer: '' } as Invoice)
      .subscribe(invoice => {
        this.invoices.push(invoice);
      });
  }

  ngOnInit() {
    this.getInvoices();
  }

}
