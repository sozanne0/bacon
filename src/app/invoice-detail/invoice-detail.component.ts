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
      .subscribe(anInvoice => this.invoice = anInvoice);
  }

  sumChange(event) {
    this.itemSum = event;
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
    }
  }

  save(): void {
    if (this.invoice.status === '') {
      this.invoice.status = 'New';
    }
    if (this.invoice.correctionAmt === null) {
      this.invoice.correctionAmt = 0;
    }
    this.invoiceService.updateInvoice(this.invoice)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
