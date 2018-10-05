import { Component, OnInit } from '@angular/core';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[];

  constructor(private vendorService: VendorService) { }

  getVendors(): void {
    this.vendorService.getVendors()
          .subscribe(vendors => this.vendors = vendors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.vendorService.addVendor({ name } as Vendor)
      .subscribe(hero => {
        this.vendors.push(hero);
      });
  }

  ngOnInit() {
    this.getVendors();
  }

}
