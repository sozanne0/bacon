import { Component, OnInit } from '@angular/core';

import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';
import { ItemsService } from '../items.service';
import { InvoiceLine } from '../invoice-line';

@Component({
  selector: 'app-receipt-report',
  templateUrl: './receipt-report.component.html',
  styleUrls: ['./receipt-report.component.css']
})
export class ReceiptReportComponent implements OnInit {

  invoices: Invoice[];
  totReceived: number;
  totCorrected: number;
  totItems: number;

  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemsService: ItemsService
  ) { }

  ngOnInit() {
    this.totReceived = 0;
    this.totCorrected = 0;
    this.totItems = 0;
    this.getInvoices();
    this.getInvoiceItems();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices()
          .subscribe(invoices => {
            for (const invoice of invoices) {
              this.totReceived += invoice.amountPaid;
              this.totCorrected += invoice.correctionAmt;
              if (invoice.correctionAmt !== 0) {
                this.log(`correcting ${invoice.id} by ${invoice.correctionAmtDollars} to ${this.totCorrected}`);
              }
            }
            this.totReceived = this.totReceived / 100;
            this.totCorrected = this.totCorrected / 100;
            this.invoices = invoices;
          });
  }

  getInvoiceItems(): void {
    this.invoiceItemsService.getInvoiceLines()
          .subscribe(
            invoiceItems => this.initializeLines(invoiceItems));
  }

  initializeLines(invoiceItems: InvoiceLine[]): void {
    for (const item of invoiceItems) {
      this.totItems += item.totalCost;
    }
    this.totItems = this.totItems / 100; // avoid rounding by converting only at end
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }

}
