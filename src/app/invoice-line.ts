import { Vendor } from './vendor';

export class InvoiceLine {
  id: number;
  invoiceId: number;
  line: number;
  vendorId: number;
  vendor: Vendor;
  description: string;
  unitCost: number;
  quantity: number;
  totalCost: number;
  dateCreated; Date;

  public setVendor(aVendor: Vendor): void {
    this.vendor = aVendor;
    if (typeof aVendor === 'object') {
      this.vendorId = aVendor.id;
      console.log('vendor:', this.vendorId, ' set in item:', this.id);
    }
  }
}
