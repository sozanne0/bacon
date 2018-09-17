import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';


@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Invoice;

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

  save(): void {
    this.invoiceService.updateInvoice(this.invoice)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
