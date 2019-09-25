import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private invoiceItemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getInvoiceItems(invoice: Invoice): void {
    this.invoiceItemsService.getInvoiceInvoiceLines(invoice)
          .subscribe(
            invoiceItems => this.initializeLines(invoiceItems));
  }

  initializeLines(invoiceItems): void {
//    const tempLines: InvoiceLine[] = [];
//    invoiceItems.forEach(function(item) {
//      tempLines.push(new InvoiceLine(item));
//    });
    this.invoiceLines = invoiceItems;
    this.lineCount = invoiceItems.length;
    this.computeSum();
  }

  add(): void {
    this.log(`Adding line to invoice: ${this.invoice.id}`);
    const newLine: InvoiceLine = { receiptId: this.invoice.id, line: this.lineCount + 1 } as InvoiceLine;
    // this.log(`new line template: ${JSON.stringify(newLine)}`);
    this.invoiceItemsService.addInvoiceLine(newLine)
      .subscribe(anInvoiceLine => {
        this.lineCount = this.invoiceLines.push(anInvoiceLine);
        this.router.navigate([`/items/${anInvoiceLine.id}`]);
      });
  }

  ngOnInit() {
    this.getInvoiceItems(this.invoice);
    // this.log(`**items init for ${JSON.stringify(this.invoice)}`);
  }

  computeSum(): void {
    let tempSum: number;
    tempSum = 0;
    if (this.invoiceLines != null) {
      this.invoiceLines.forEach( function(item) {
        tempSum += item.totalCostDollars;
      //  console.log('** summing lines', [tempSum]);
      });
    }
    this.sum = tempSum;
    this.change.emit(tempSum);
   }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }
}
