import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService } from '../items.service';
import { InvoiceLine } from '../invoice-line';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.css']
})
export class VendorReportComponent implements OnInit {

  invoiceLines: InvoiceLine[];
  vendors: Vendor[];
  vendorSums: [Vendor, number, number][];

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location,
    private vendorService: VendorService
    ) {}

  ngOnInit() {
    this.vendors = [];
    // add every vendor (with items)
    this.loadVendors();
    this.log('exiting VendorReportComponent.ngOnInit()');
  }

  loadVendors(): void {
    this.vendorService.getVendors().subscribe(
      allVendors => {
        this.log(`adding lines to ${allVendors.length} vendors`);
        this.log(`first vendor: ${allVendors[0].name}`);
        for (const vendor of allVendors) {
//        allVendors.forEach(function (vendor) {
          this.log(`getting lines for Vendor ${vendor.id}`);
          this.itemsService.getVendorInvoiceLines(vendor).subscribe(
            lines => {
              this.computeValues(vendor);
              this.log(`done adding ${lines.length} lines to vendor: ${vendor.id}`);
              this.vendors.push(vendor);
            }
          );
          // this.log(`vendor has ${vendor.invoiceLines.length} lines`);
        }
      }
    );
  }

  /**
   * sum lines
   *
   */
  computeValues(vendor: Vendor) {
    let sum = 0;
    for (const line of vendor.invoiceLines) {
      sum += line.totalCostDollars;
    }
    vendor.itemSumDollars = sum;
  }


  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging
     console.log(message);
  }

}
