import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InvoiceService } from '../invoice.service';
import { Invoice } from '../invoice';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[];
  currentUser: User;

  constructor(
    private invoiceService: InvoiceService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  getInvoices(): void {
    if (this.isCurrentUserUndefined()) {
      this.invoiceService.getInvoices()
          .subscribe(invoices => this.invoices = invoices);
    } else {
      this.invoiceService.getUserInvoices(this.currentUser.id).subscribe( invoices => {
        invoices.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          } else if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
        this.invoices = invoices;
      });
    }
  }

  isCurrentUserUndefined(): boolean {
    this.currentUser = this.userService.getCurrentUser();
    return this.currentUser === undefined;
  }

  currentUserInfo(): String {
    const user = this.userService.getCurrentUser();
    return (user === undefined) ? 'no current user!' : user.name;
  }

  add(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser === undefined) {
      // do something
      this.log('No receipt added - No current user!');
    } else {
      this.invoiceService.addInvoice({ status: 'New', userId: currentUser.id } as Invoice)
        .subscribe(anInvoice => {
          this.invoices.push(anInvoice);
          this.router.navigate([`./${anInvoice.id}`], { relativeTo: this.route });
        });
    }
  }

  ngOnInit() {
    this.getInvoices();
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }

}
