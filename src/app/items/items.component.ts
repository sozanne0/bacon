import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ItemsService } from '../items.service';
import { Invoice } from '../invoice';
import { InvoiceLine } from '../invoice-line';
// simport { Vendor } from '../vendor';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input () invoice: Invoice;
  invoiceLines: InvoiceLine[];
  lineCount: number;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  sum: number;

  constructor(private invoiceItemsService: ItemsService) { }

  getInvoiceItems(invoice: Invoice): void {
    this.invoiceItemsService.getInvoiceInvoiceLines(invoice)
          .subscribe(
            invoiceItems => this.initializeLines(invoiceItems));
  }

  initializeLines(invoiceItems): void {
    this.invoiceLines = invoiceItems;
    this.lineCount = invoiceItems.length;
    this.computeSum();
  }

  add(): void {
  //  const vendor = new Vendor;
    this.invoiceItemsService.addInvoiceLine({ invoiceId: this.invoice.id, line: this.lineCount + 1 } as InvoiceLine)
      .subscribe(invoiceLine => {
        this.lineCount = this.invoiceLines.push(invoiceLine);
      });
  }

  ngOnInit() {
    this.getInvoiceItems(this.invoice);
  //  console.log('**items init');
  }

  computeSum(): void {
    let tempSum: number;
    tempSum = 0;
    if (this.invoiceLines != null) {
      this.invoiceLines.forEach( function(item) {
        tempSum += item.totalCost;
      //  console.log('** summing lines', [tempSum]);
      });
    }
    this.sum = tempSum;
    this.change.emit(tempSum);
   }
}
