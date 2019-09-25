import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ItemsService } from '../items.service';
import { InvoiceLine } from '../invoice-line';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';
import { SummaryInfo } from '../summary-info';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.css']
})
export class VendorReportComponent implements OnInit {

  invoiceLines: InvoiceLine[];
  vendors: Vendor[];
  summaryInfo: SummaryInfo[];
  overallSummary: SummaryInfo;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private location: Location,
    private vendorService: VendorService
    ) {}

  ngOnInit() {
    // initialize values to handle delayed load/compute
    this.vendors = [];
    this.summaryInfo = [];
    this.overallSummary =  new SummaryInfo({
      'grossSumDollars': 0,
      'consignmentShareDollars': 0,
      'netSumDollars': 0 });

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
              this.computeOverall();
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
    let netSum = sum;
    if (vendor.category === 'v') {
      netSum = sum * 0.8; // 20% to church (80% to vendor)
      // now make sure that there are an integer number of cents!
      netSum = Number(Math.round(netSum * 100) / 100);
    } else if (vendor.category === 'c') {
      netSum = 0; // 100% to church
    }
    const share = sum - netSum;
    vendor.itemSumDollars = sum;
    this.summaryInfo[vendor.id] =  new SummaryInfo({
      'grossSumDollars': sum,
      'consignmentShareDollars': share,
      'netSumDollars': netSum });
  }

  /** Sum all vendor totals */
  computeOverall() {
    let grossSum = 0;
    let consignmentShare = 0;
    let netSum = 0;
    for (const vSummary of this.summaryInfo) {
      if (vSummary !== undefined) {
        grossSum += vSummary.grossSumDollars;
        consignmentShare += vSummary.consignmentShareDollars;
        netSum += vSummary.netSumDollars;
      }
    }
    this.overallSummary =  new SummaryInfo({
      'grossSumDollars': grossSum,
      'consignmentShareDollars': consignmentShare,
      'netSumDollars': netSum });
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging
     console.log(message);
  }

}
