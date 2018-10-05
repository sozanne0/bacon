import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { ItemsService } from '../items.service';
import { InvoiceLine } from '../invoice-line';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  invoiceLine: InvoiceLine;
  vendors: Vendor[];

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.getVendors();
    this.getInvoiceLine();
  }

  getInvoiceLine(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemsService.getInvoiceLine(id)
      .subscribe(anInvoiceLine => this.invoiceLine = anInvoiceLine);
  }

  getVendors(): void {
    this.vendorService.getVendors().subscribe(
        allVendors => this.vendors = allVendors);
  }

  compareVendors(v1: Vendor, v2: Vendor): boolean {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
}

  save(): void {
    this.invoiceLine.totalCost = this.invoiceLine.quantity * this.invoiceLine.unitCost;
    if (typeof this.invoiceLine.vendor === 'object') {
      this.invoiceLine.vendorId = this.invoiceLine.vendor.id;
      // console.log(JSON.stringify(this.invoiceLine));
      // console.log('adding vendor id:', this.invoiceLine.vendorId);
    }
    // console.log('about to update:', this.invoiceLine, ' including vendor:', this.invoiceLine.vendor);
    this.itemsService.updateInvoiceLine(this.invoiceLine)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
