import { Component, OnInit, Input } from '@angular/core';

import { ItemsService } from '../items.service';
import { Invoice } from '../invoice';
import { InvoiceLine } from '../invoice-line';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input () invoice: Invoice;
  invoiceLines: InvoiceLine[];
  lineCount: number;

  constructor(private invoiceItemsService: ItemsService) { }

  getInvoiceItems(invoice: Invoice): void {
    this.invoiceItemsService.getInvoiceInvoiceLines(invoice)
          .subscribe(
            invoiceItems => this.initializeLines(invoiceItems));
  }

  initializeLines(invoiceItems): void {
    this.invoiceLines = invoiceItems;
    this.lineCount = invoiceItems.length;
  }

  add(): void {
    this.invoiceItemsService.addInvoiceLine({ invoiceId: this.invoice.id, line: this.lineCount + 1 } as InvoiceLine)
      .subscribe(invoiceLine => {
        this.lineCount = this.invoiceLines.push(invoiceLine);
      });
  }

  ngOnInit() {
    this.getInvoiceItems(this.invoice);
  }

}
