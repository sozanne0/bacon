import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: Vendor;

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVendor();
  }

  getVendor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vendorService.getVendor(id)
      .subscribe(vendor => this.vendor = vendor);
  }

  save(): void {
    this.vendorService.updateVendor(this.vendor)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
