import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[];

  constructor(
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getVendors(): void {
    this.vendorService.getVendors()
          .subscribe(vendors => this.vendors = vendors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.vendorService.addVendor({ name } as Vendor)
      .subscribe(aVendor => {
        this.vendors.push(aVendor);
      //  this.log(`vendor added: ${JSON.stringify(aVendor)}`);
        const url = `./${aVendor.id}`;
      //  this.log(`Navigating to ${url}`);
        this.router.navigate([url], { relativeTo: this.route });
      });
  }

  ngOnInit() {
    this.getVendors();
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }

}
