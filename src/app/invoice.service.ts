import { Injectable } from '@angular/core';

import { Invoice } from './invoice';
import { INVOICES } from './mock-invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  getInvoices(): Invoice[] {
    return INVOICES;
  }
}
