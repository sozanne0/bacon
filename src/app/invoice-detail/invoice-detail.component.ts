import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Invoice;
  itemSum: number;
  diff: string;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getInvoice();
  }

  getInvoice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.invoiceService.getInvoice(id)
      .subscribe( anInvoice => {
        this.invoice = anInvoice;
        if (anInvoice.status === 'Error') {
          this.computeDiff();
        }
      });
  }

  sumChange(event) {
    this.itemSum = event;
    this.computeDiff();
    // console.log('item sum changed');
  }

  // compute difference between receipt amount and item total
  // update value in diff (in dollars) but return diff in pennies
  computeDiff(): number {
    const iSum = (this.itemSum === undefined) ? 0 : this.itemSum;
    const amountPaid = (this.invoice.amountPaidDollars === undefined) ? 0 : this.invoice.amountPaidDollars;
    const correction = (this.invoice.correctionAmtDollars === undefined) ? 0 : this.invoice.correctionAmtDollars;
    const ldiff = ((amountPaid - iSum) - correction);
    this.diff = ldiff.toFixed(2);
    // console.log('sum:', iSum, 'paid:', amountPaid, 'corr:', correction, ' diff:', this.diff);
    return ldiff * 100;
  }

  balanceInvoice() {
    const ldiff = this.computeDiff();
    if (Math.abs(ldiff) < 1) {
      this.setBalancedStatus();
      // now save the updated status!
      this.save();
      this.goBack();
    } else {
      this.setErrorStatus();
      this.save();
    }
  }

  save(): void {
    if (this.invoice.status === undefined || this.invoice.status === 'New') {
      this.invoice.status = 'Open';
    }
    if (this.invoice.correctionAmt === undefined) {
      this.invoice.correctionAmt = 0;
    }
    this.invoiceService.updateInvoice(this.invoice)
      .subscribe();
  }

  setOpenStatus(): void {
    this.invoice.status = 'Open';
  }

  setBalancedStatus(): void {
    this.invoice.status = 'Balanced';
  }

  setErrorStatus(): void {
    this.invoice.status = 'Error';
  }

  goBack(): void {
    this.location.back();
  }

  log(message: string) {
    console.log(message);
  }
}
