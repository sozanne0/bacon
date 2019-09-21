import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router, ActivatedRoute } from '@angular/router';
=======
>>>>>>> master

import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: Vendor[];

<<<<<<< HEAD
  constructor(
    private vendorService: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
=======
  constructor(private vendorService: VendorService) { }
>>>>>>> master

  getVendors(): void {
    this.vendorService.getVendors()
          .subscribe(vendors => this.vendors = vendors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.vendorService.addVendor({ name } as Vendor)
<<<<<<< HEAD
      .subscribe(aVendor => {
        this.vendors.push(aVendor);
      //  this.log(`vendor added: ${JSON.stringify(aVendor)}`);
        const url = `./${aVendor.id}`;
      //  this.log(`Navigating to ${url}`);
        this.router.navigate([url], { relativeTo: this.route });
=======
      .subscribe(hero => {
        this.vendors.push(hero);
>>>>>>> master
      });
  }

  ngOnInit() {
    this.getVendors();
  }

<<<<<<< HEAD
  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }

=======
>>>>>>> master
}
