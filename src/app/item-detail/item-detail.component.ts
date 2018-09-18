import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService } from '../items.service';
import { InvoiceLine } from '../invoice-line';


@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  invoiceLine: InvoiceLine;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getInvoiceLine();
  }

  getInvoiceLine(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemsService.getInvoiceLine(id)
      .subscribe(anInvoiceLine => this.invoiceLine = anInvoiceLine);
  }

  save(): void {
    this.invoiceLine.totalCost = this.invoiceLine.quantity * this.invoiceLine.unitCost;
    this.itemsService.updateInvoiceLine(this.invoiceLine)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
