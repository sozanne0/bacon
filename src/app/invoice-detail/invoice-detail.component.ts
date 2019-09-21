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
<<<<<<< HEAD
  diff: string;
=======
>>>>>>> master

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
<<<<<<< HEAD
      .subscribe( anInvoice => {
        this.invoice = anInvoice;
        if (anInvoice.status === 'Error') {
          this.computeDiff();
        }
      });
=======
      .subscribe(anInvoice => this.invoice = anInvoice);
>>>>>>> master
  }

  sumChange(event) {
    this.itemSum = event;
<<<<<<< HEAD
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
=======
    // console.log('item sum changed');
  }

  balanceInvoice() {
    const itemSum = this.itemSum === undefined ? 0 : this.itemSum;
    const amountPaid = this.invoice.amountPaid === undefined ? 0 : this.invoice.amountPaid;
    const correction = this.invoice.correctionAmt === undefined ? 0 : this.invoice.correctionAmt;
    let diff = (itemSum - amountPaid) - correction;
    diff = +diff.toFixed(2);
    console.log('sum:', itemSum, 'paid:', amountPaid, 'corr:', correction, ' diff:', diff);
    if (diff === 0) {
      this.invoice.status = 'Balanced';
    } else {
      this.invoice.status = 'Error';
>>>>>>> master
    }
  }

  save(): void {
<<<<<<< HEAD
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
=======
    if (this.invoice.status === '') {
      this.invoice.status = 'New';
    }
    if (this.invoice.correctionAmt === null) {
      this.invoice.correctionAmt = 0;
    }
    this.invoiceService.updateInvoice(this.invoice)
      .subscribe(() => this.goBack());
>>>>>>> master
  }

  goBack(): void {
    this.location.back();
  }

<<<<<<< HEAD
  log(message: string) {
    console.log(message);
  }
=======
>>>>>>> master
}
