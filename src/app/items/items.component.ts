import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
<<<<<<< HEAD
import { Router, ActivatedRoute } from '@angular/router';
=======
>>>>>>> master

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

<<<<<<< HEAD
  constructor(
    private invoiceItemsService: ItemsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
=======
  constructor(private invoiceItemsService: ItemsService) { }
>>>>>>> master

  getInvoiceItems(invoice: Invoice): void {
    this.invoiceItemsService.getInvoiceInvoiceLines(invoice)
          .subscribe(
            invoiceItems => this.initializeLines(invoiceItems));
  }

  initializeLines(invoiceItems): void {
<<<<<<< HEAD
//    const tempLines: InvoiceLine[] = [];
//    invoiceItems.forEach(function(item) {
//      tempLines.push(new InvoiceLine(item));
//    });
=======
>>>>>>> master
    this.invoiceLines = invoiceItems;
    this.lineCount = invoiceItems.length;
    this.computeSum();
  }

  add(): void {
<<<<<<< HEAD
    this.log(`Adding line to invoice: ${this.invoice.id}`);
    const newLine: InvoiceLine = { receiptId: this.invoice.id, line: this.lineCount + 1 } as InvoiceLine;
    // this.log(`new line template: ${JSON.stringify(newLine)}`);
    this.invoiceItemsService.addInvoiceLine(newLine)
      .subscribe(anInvoiceLine => {
        this.lineCount = this.invoiceLines.push(anInvoiceLine);
        this.router.navigate([`/items/${anInvoiceLine.id}`]);
=======
  //  const vendor = new Vendor;
    this.invoiceItemsService.addInvoiceLine({ invoiceId: this.invoice.id, line: this.lineCount + 1 } as InvoiceLine)
      .subscribe(invoiceLine => {
        this.lineCount = this.invoiceLines.push(invoiceLine);
>>>>>>> master
      });
  }

  ngOnInit() {
    this.getInvoiceItems(this.invoice);
<<<<<<< HEAD
    // this.log(`**items init for ${JSON.stringify(this.invoice)}`);
=======
  //  console.log('**items init');
>>>>>>> master
  }

  computeSum(): void {
    let tempSum: number;
    tempSum = 0;
    if (this.invoiceLines != null) {
      this.invoiceLines.forEach( function(item) {
<<<<<<< HEAD
        tempSum += item.totalCostDollars;
=======
        tempSum += item.totalCost;
>>>>>>> master
      //  console.log('** summing lines', [tempSum]);
      });
    }
    this.sum = tempSum;
    this.change.emit(tempSum);
   }
<<<<<<< HEAD

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }
=======
>>>>>>> master
}
